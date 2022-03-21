import { postgrestClient } from "@/clients/postgrestClient";
import { filesService } from "@/services/files/filesService";
export const placesService = {
  create: async (args: {
    name: string;
    latitude: string;
    longitude: string;
    address: string;
    zonesTemplate: { name: string }[];
    sectionsSvgFile: File;
  }) => {
    const filename = await filesService.upload(args.sectionsSvgFile);
    await postgrestClient.post("/places", {
      name: args.name,
      longitude: args.longitude,
      latitude: args.latitude,
      address: args.address,
      zones_template: args.zonesTemplate,
      sections_svg_filename: filename,
    });
  },
  update: async (args: {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    address: string;
    zonesTemplate: { name: string }[];
  }) => {
    console.log(args.zonesTemplate);
    await postgrestClient.patch(`/places?id=eq.${args.id}`, {
      name: args.name,
      longitude: args.longitude,
      latitude: args.latitude,
      address: args.address,
      zones_template: args.zonesTemplate,
    });
  },
  delete: async (id: string) => {
    await postgrestClient.delete(`/places?id=eq.${id}`);
  },
};
