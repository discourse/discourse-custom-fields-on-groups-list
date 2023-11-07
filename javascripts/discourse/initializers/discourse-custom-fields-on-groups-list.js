import { ajax } from "discourse/lib/ajax";
import { withPluginApi } from "discourse/lib/plugin-api";

function initialize(api) {
  const PLUGIN_ID = "discourse-custom-fields-on-groups-list";

  api.modifyClassStatic("model:group", {
    pluginId: PLUGIN_ID,
    loadMembers(name, opts) {
      let params = { ...opts, include_custom_fields: true };
      return ajax(`/groups/${name}/members.json`, { data: params });
    },
  });
}

export default {
  name: "discourse-custom-fields-on-groups-list",

  initialize() {
    withPluginApi("1.2.0", initialize);
  },
};
