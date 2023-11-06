import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import { fixturesByUrl } from "discourse/tests/helpers/create-pretender";
import { cloneJSON } from "discourse-common/lib/object";

acceptance("Group Members Index - Custom Fields", function (needs) {
  needs.user();

  needs.pretender((server, helper) => {
    server.get("/groups/discourse/members.json", () => {
      let response = cloneJSON(fixturesByUrl["/groups/discourse/members.json"]);
      response.members = response.members.map((member) => {
        return {
          ...member,
          custom_fields: {
            user_field_34: `this custom field is visible for member ${member.username}`,
            user_field_35: `this custom field is not visible for member ${member.username}`,
          },
        };
      });

      return helper.response(200, response);
    });
  });

  needs.hooks.beforeEach(function () {
    settings.user_custom_field_ids_to_show = "34";
  });

  needs.site({
    user_fields: [
      {
        id: 34,
        name: "My Custom Field 1",
        field_type: "text",
        required: true,
      },
      {
        id: 35,
        name: "My Custom Field 2",
        field_type: "text",
        required: true,
      },
    ],
  });

  test("Viewing the groups", async function (assert) {
    await visit("/g/discourse");

    assert
      .dom(".directory-table__column-header--user-field-34")
      .hasText("My Custom Field 1", "shows custom field header");

    const rows = document.querySelectorAll(".directory-table__row");
    rows.forEach((row, index) => {
      assert
        .dom(
          ".directory-table__cell--custom-field-34 .directory-table__value",
          row
        )
        .includesText(
          "this custom field is visible for member",
          `it shows a custom field value for member at row ${index + 1}`
        );
    });

    assert
      .dom(".directory-table__column-header--user-field-35")
      .doesNotExist(
        "does not show fields that are not in the user_custom_field_ids_to_show setting"
      );
    rows.forEach((row) => {
      assert
        .dom(".directory-table__cell--custom-field-35", row)
        .doesNotExist(`does not show custom field value in row`);
    });
  });
});
