import { Request } from "express";

export const format = (ad: any, req: Request) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const formattedAd = { ...ad };

  if (formattedAd.imageUrl && !formattedAd.imageUrl.startsWith("http")) {
    const cleanPath = formattedAd.imageUrl.startsWith("/")
      ? formattedAd.imageUrl
      : `/${formattedAd.imageUrl}`;

    formattedAd.imageUrl = `${baseUrl}${cleanPath}`;
  }

  return formattedAd;
};

export const formatMany = (ads: any[], req: Request) => {
  if (!Array.isArray(ads)) return [];
  return ads.map((ad) => format(ad, req));
};
