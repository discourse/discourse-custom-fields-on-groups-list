import Component from "@ember/component";
import TableHeaderRenderer from "_fake_theme/discourse/components/table-header-renderer";
import { tagName } from "@ember-decorators/component";

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
