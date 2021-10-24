export type Range = {
  [index: string]: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
};

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

enum EmploymentType {
  fullTime = 'fullTime',
  contractor = 'contractor',
}

enum Department {
  Operations = 'Operations',
  Management = 'Management',
  Kitchen = 'Kitchen',
  FrontOfHouse = 'FrontOfHouse',
}

type GenderRange = {
  gender: Gender;
  range: Range;
};

type EmploymentTypeRange = {
  employmentType: EmploymentType;
  range: Range;
};

type LevelRange = {
  level: number;
  range: Range;
};

type DepartmentRange = {
  employmentType: Department;
  range: Range;
};

type RestaurantCompRange = {
  name: string;
  range: Range;
  genderRange: GenderRange[];
  employmentTypeRange: EmploymentTypeRange[];
  departmentCompRange: DepartmentRange[];
  levelCompRange: LevelRange[];
};

type RestaurantSalaryRange = {
  name: string;
  range: Range;
  genderRange: GenderRange[];
  employmentTypeRange: EmploymentTypeRange[];
};

type RestaurantBonusRange = {
  name: string;
  range: Range;
  genderRange: GenderRange[];
  employmentTypeRange: EmploymentTypeRange[];
};

export type GetCompRange = {
  getRestaurantCompRanges: RestaurantCompRange[];
  getRestaurantSalaryRanges: RestaurantSalaryRange[];
  getRestaurantBonusRanges: RestaurantBonusRange[];
};
