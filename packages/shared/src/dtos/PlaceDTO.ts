export type PlaceDTO = {
  id: string;
  name: string;
  address: string;
  sections_svg_filename: string;
  zones_template: { name: string }[];
  latitude: string;
  longitude: string;
};
