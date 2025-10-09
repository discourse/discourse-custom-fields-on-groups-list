import { ajax } from "discourse/lib/ajax";
import { withPluginApi } from "discourse/lib/plugin-api";

export const USER_FIELD_PREFIX = "user_field_";

function initialize(api) {
  const PLUGIN_ID = "discourse-custom-fields-on-groups-list";

  api.modifyClassStatic("model:group", {
    pluginId: PLUGIN_ID,
    loadMembers(name, opts) {
      const params = { ...opts, include_custom_fields: true };

      if (params.order?.startsWith(USER_FIELD_PREFIX)) {
        params.order_field = params.order;
        params.order = "custom_field";
      }

      return ajax(`/groups/${name}/members.json`, { data: params });
    },
  });
}

export default {
  name: "discourse-custom-fields-on-groups-list",

  initialize() {
    withPluginApi(initialize);
  },
};
