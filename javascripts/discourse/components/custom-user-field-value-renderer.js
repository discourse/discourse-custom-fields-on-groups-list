import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class CustomUserFieldValueRenderer extends Component {
  @tracked filteredCustomValues = [];

  constructor() {
    super(...arguments);
    const customFields = this.args.member.custom_fields;
    const desiredFields = settings.user_custom_field_ids_to_show
      .split("|")
      .map((id) => parseInt(id, 10));

    this.filteredCustomValues = desiredFields.map((desiredFieldId) => {
      const userField = this.args.userFields.find(
        (field) => field.id === desiredFieldId
      );
      const fieldKey = `user_field_${desiredFieldId}`;
      return {
        id: desiredFieldId,
        name: userField ? userField.name : "",
        value: customFields[fieldKey] || "",
      };
    });
  }
}
