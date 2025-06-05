import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import CustomUserFieldValueRenderer from "../../components/custom-user-field-value-renderer";

@tagName("")
export default class CustomFieldValues extends Component {
  <template>
    <CustomUserFieldValueRenderer
      @userFields={{this.site.user_fields}}
      @member={{@outletArgs.member}}
    />
  </template>
}
