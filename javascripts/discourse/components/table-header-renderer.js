import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TableHeaderRenderer extends Component {
  @tracked filteredUserFields = [];

  constructor() {
    super(...arguments);
    const idsToShow = settings.user_custom_field_ids_to_show
      .split("|")
      .map((id) => parseInt(id, 10));
    this.filteredUserFields = this.args.userFields.filter((field) =>
      idsToShow.includes(field.id)
    );
  }
}
