import Component from "@glimmer/component";
import { getOwnerWithFallback } from "discourse-common/lib/get-owner";
import TableHeaderToggle from "discourse/components/table-header-toggle"
import { USER_FIELD_PREFIX } from "../initializers/discourse-custom-fields-on-groups-list";

export default class TableHeaderRenderer extends Component {
  idsToShow = settings.user_custom_field_ids_to_show
    .split("|")
    .map((id) => parseInt(id, 10));
  filteredUserFields = this.args.userFields
    .filter((field) => this.idsToShow.includes(field.id))

  fieldNameToFieldIdMap = this.filteredUserFields.reduce((acc, field) => {
    acc[field.name] = `${USER_FIELD_PREFIX}${field.id}`;
    return acc;
  }, {});
  fieldIdToFieldNameMap = this.filteredUserFields.reduce((acc, field) => {
    acc[`${USER_FIELD_PREFIX}${field.id}`] = field.name;
    return acc;
  }, {});

  _groupIndexController = null;

  constructor() {
    super(...arguments);
    this._groupIndexController = getOwnerWithFallback(this).lookup("controller:group-index");
  }

  get order() {
    return this.fieldIdToFieldNameMap[this.args.order];
  }

  set order(order) {
    this._groupIndexController.set("order", this.fieldNameToFieldIdMap[order]);
  }

  get asc() {
    return this.args.asc;
  }

  set asc(asc) {
    this._groupIndexController.set("asc", asc);
  }

  <template>
    {{#each this.filteredUserFields as |userField|}}
      <TableHeaderToggle
        @class="directory-table__column-header--user-field-{{userField.id}}"
        @order={{this.order}}
        @asc={{this.asc}}
        @translated={{true}}
        @field={{userField.name}}
        @automatic={{false}}
      />
    {{/each}}
  </template>
}
