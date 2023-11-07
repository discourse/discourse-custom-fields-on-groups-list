import Component from "@glimmer/component";

export default class CustomUserFieldValueRenderer extends Component {
  get filteredCustomValues() {
    const customFields = this.args.member.custom_fields;
    const desiredFields = settings.user_custom_field_ids_to_show
      .split("|")
      .map((id) => parseInt(id, 10));

    return desiredFields.map((desiredFieldId) => {
      const userField = this.args.userFields.find(
        (field) => field.id === desiredFieldId
      );
      return {
        id: desiredFieldId,
        name: userField?.name || "",
        value: customFields[`user_field_${desiredFieldId}`] || "",
      };
    });
  }
}
