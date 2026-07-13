import { withPluginApi } from "discourse/lib/plugin-api";

export const USER_FIELD_PREFIX = "user_field_";

function initialize(api) {
  api.registerValueTransformer("group-members-request", ({ value: opts }) => {
    const params = { ...opts, include_custom_fields: true };

    if (params.order?.startsWith(USER_FIELD_PREFIX)) {
      params.order_field = params.order;
      params.order = "custom_field";
    }

    return params;
  });
}

export default {
  name: "discourse-custom-fields-on-groups-list",

  initialize() {
    withPluginApi(initialize);
  },
};
