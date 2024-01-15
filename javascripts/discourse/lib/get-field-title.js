export default function getFieldTitle(field) {
  return settings.show_field_description_on_header
    ? field.description
    : field.name;
}
