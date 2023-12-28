import { visit, click } from "@ember/test-helpers";
import { test } from "qunit";
import { fixturesByUrl } from "discourse/tests/helpers/create-pretender";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import { cloneJSON } from "discourse-common/lib/object";

acceptance("Group Members Index - Custom Fields", function (needs) {
  needs.user();

  needs.pretender((server, helper) => {
    server.get("/groups/discourse/members.json", ({ queryParams }) => {
      const response = cloneJSON(
        fixturesByUrl["/groups/discourse/members.json"]
      );

      // change the original order to not be alphabetical
      response.members.sort((a, b) => a.id - b.id);

      response.members = response.members.map((member) => {
        return {
          ...member,
          custom_fields: {
            user_field_34: `field 34 for ${member.username}`,
            user_field_35: `field 35 for ${member.username}`,
          },
        };
      });

      if (queryParams.order_field) {
        response.members.sort(
          (a, b) =>
            (queryParams.asc ? -1 : 1) *
            a.custom_fields[queryParams.order_field].localeCompare(
              b.custom_fields[queryParams.order_field]
            )
        );
      }

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
          ".directory-table__cell--user-field-34 .directory-table__value",
          row
        )
        .includesText(
          "field 34 for",
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

  test("Sorting by custom field", async function (assert) {
    await visit("/g/discourse");

    let rows = document.querySelectorAll(
      ".directory-table__cell--user-field-34 .directory-table__value"
    );

    assert.deepEqual(
      [...rows].map((row) => row.textContent.trim()),
      [
        "field 34 for sam",
        "field 34 for neil",
        "field 34 for supermathie",
        "field 34 for eviltrout",
        "field 34 for codinghorror",
        "field 34 for zogstrip",
        "field 34 for awesomerobot",
      ],
      "shows custom field values in original order"
    );

    await click(".directory-table__column-header--user-field-34");

    rows = document.querySelectorAll(
      ".directory-table__cell--user-field-34 .directory-table__value"
    );

    assert.deepEqual(
      [...rows].map((row) => row.textContent.trim()),
      [
        "field 34 for awesomerobot",
        "field 34 for codinghorror",
        "field 34 for eviltrout",
        "field 34 for neil",
        "field 34 for sam",
        "field 34 for supermathie",
        "field 34 for zogstrip",
      ],
      "shows custom field values sorted ascending"
    );

    await click(".directory-table__column-header--user-field-34");

    rows = document.querySelectorAll(
      ".directory-table__cell--user-field-34 .directory-table__value"
    );

    assert.deepEqual(
      [...rows].map((row) => row.textContent.trim()),
      [
        "field 34 for zogstrip",
        "field 34 for supermathie",
        "field 34 for sam",
        "field 34 for neil",
        "field 34 for eviltrout",
        "field 34 for codinghorror",
        "field 34 for awesomerobot",
      ],
      "shows custom field values sorted descending"
    );
  });
});
