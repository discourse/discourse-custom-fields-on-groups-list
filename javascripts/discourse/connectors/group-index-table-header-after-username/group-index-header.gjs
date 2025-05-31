import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import TableHeaderRenderer from "../../components/table-header-renderer";

@tagName("")
export default class GroupIndexHeader extends Component {
  <template>
    <TableHeaderRenderer
      @userFields={{this.site.user_fields}}
      @asc={{@outletArgs.asc}}
      @order={{@outletArgs.order}}
    />
  </template>
}
