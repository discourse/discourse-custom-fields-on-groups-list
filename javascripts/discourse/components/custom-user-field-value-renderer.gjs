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

  <template>
    {{#each this.filteredCustomValues as |userField|}}
      <div
        class="directory-table__cell directory-table__cell--user-field-{{userField.id}}"
      >
        <span class="directory-table__label">
          <span>{{userField.name}}</span>
        </span>
        <span class="directory-table__value">
          {{userField.value}}
        </span>
      </div>
    {{/each}}
  </template>
}
