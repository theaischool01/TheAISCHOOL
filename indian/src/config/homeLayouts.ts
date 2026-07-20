export type HomeSection =
  | "hero"
  | "partners"
  | "learning-journey"
  | "frameworks"
  | "orbit"
  | "assessment"
  | "snapshot"
  | "hackathon"
  | "team"
  | "reviews"
  | "registration"
  | "courses"
  | "mission"
  | "statement";

export const HOME_LAYOUTS: Record<string, HomeSection[]> = {
  in: [
    "hero",
    "partners",
    "team",
    "learning-journey",
    "frameworks",
    "orbit",
    "assessment",
    "snapshot",
    "hackathon",
    "reviews",
    "registration"
  ],
  us: [
    "hero",
    "partners",
    "snapshot",
    "courses",
    "mission",
    "statement",
    "registration"
  ],
  ph: [
    "hero",
    "partners",
    "snapshot",
    "courses",
    "mission",
    "statement",
    "registration"
  ]
};
