import Component from "@glimmer/component";

export default class TableHeaderRenderer extends Component {
  idsToShow = settings.user_custom_field_ids_to_show
    .split("|")
    .map((id) => parseInt(id, 10));
  };
  filteredUserFields = this.args.userFields.filter((field) =>
    this.idsToShow.includes(field.id)
  );
}
