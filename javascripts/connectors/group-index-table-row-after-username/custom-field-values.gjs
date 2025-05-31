import Component from "@ember/component";
import CustomUserFieldValueRenderer from "_fake_theme/discourse/components/custom-user-field-value-renderer";
import { tagName } from "@ember-decorators/component";

@tagName("")
export default class CustomFieldValues extends Component {
  <template>
    <CustomUserFieldValueRenderer
      @userFields={{this.site.user_fields}}
      @member={{@outletArgs.member}}
    />
  </template>
}
