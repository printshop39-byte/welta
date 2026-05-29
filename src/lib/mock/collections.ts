import type { Collection } from "@/types/collection";
import { mockProducts } from "@/lib/mock/products";

/**
 * Count how many products live under a given collection slug.
 * Derived at module load so the surface count on collection cards
 * stays honest after every mockProducts edit. No circular imports
 * because mockProducts doesn't import mockCollections back.
 */
function countFor(slug: string): number {
  return mockProducts.filter((p) => p.collectionSlug === slug).length;
}

export const mockCollections: Collection[] = [
  {
    id: "col-anarkali",
    slug: "anarkali",
    name: "Anarkali",
    tagline: "Regal silhouettes, hand-stitched grace",
    description:
      "Floor-sweeping anarkalis with intricate Lucknowi chikankari on georgette, cotton and mul-mul. Each piece carries hours of hand needlework from our karigars in Lucknow.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("anarkali"),
  },
  {
    id: "col-kurta-sets",
    slug: "kurta-sets",
    name: "Kurta Sets",
    tagline: "Everyday luxury in white-on-white",
    description:
      "Three-piece chikankari kurta sets in breathable cotton and mul. Co-ordinated dupattas, ankle-length palazzos and signature hand embroidery.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("kurta-sets"),
  },
  {
    id: "col-sarees",
    slug: "sarees",
    name: "Sarees",
    tagline: "Six yards of heirloom craft",
    description:
      "Chikankari sarees in chiffon, georgette and pure cotton. Featuring shadow work, jaali and murri stitches passed down through generations.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("sarees"),
  },
  {
    id: "col-dupattas",
    slug: "dupattas",
    name: "Dupattas",
    tagline: "The finishing touch",
    description:
      "Hand-embroidered chikankari dupattas in mul, chanderi and georgette — the perfect accent to your wardrobe.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("dupattas"),
  },
  {
    id: "col-festive",
    slug: "festive",
    name: "Festive Edit",
    tagline: "Curated for celebrations",
    description:
      "A curated edit of statement chikankari pieces for weddings, festive evenings and intimate gatherings.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("festive"),
  },
  {
    id: "col-men",
    slug: "men",
    name: "Men",
    tagline: "Quiet luxury, hand-finished",
    description:
      "Chikankari kurtas and bundis for men. Soft cottons, subtle thread work, made for timeless wear.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("men"),
  },
  {
    id: "col-kurtis",
    slug: "kurtis",
    name: "Kurtis",
    tagline: "Easy elegance for every day",
    description:
      "Short and mid-length chikankari kurtis and tunics in rayon, cotton and georgette. Light hand embroidery, designed to wear from morning meetings to long evenings.",
    // Real photo borrowed from the matching black sleeveless kurti row.
    heroImage: "/products/black-sleeveless-chikankari-top.jpg",
    thumbnail: "/products/black-sleeveless-chikankari-top.jpg",
    productCount: countFor("kurtis"),
  },
  {
    id: "col-bottoms",
    slug: "bottoms",
    name: "Bottoms",
    tagline: "Plazo, palazzos & co-ordinates",
    description:
      "Comfortable plazos, palazzos and cotton pants designed to pair with our chikankari kurtis and kurta sets. Lightweight fabrics, easy silhouettes.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("bottoms"),
  },
  {
    id: "col-kids",
    slug: "kids",
    name: "Kids",
    tagline: "Little wardrobes, big craft",
    description:
      "Chikankari kurtas and sets for kids — soft cottons, light embroidery, made to be loved through every wear and wash.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("kids"),
  },
  {
    id: "col-accessories",
    slug: "accessories",
    name: "Accessories",
    tagline: "Finishing touches from the atelier",
    description:
      "Hair clips, earrings and small accents that complete a chikankari look. Designed and finished in our Lucknow atelier.",
    heroImage: "/placeholders/placeholder.svg",
    thumbnail: "/placeholders/placeholder.svg",
    productCount: countFor("accessories"),
  },
];
