const fs = require('fs');
const path = require('path');
const csvparser = require('csv-parser');

const HOOKFISH_DATA_SET = './data/hookfish.csv'
const GAMINE_DATA_SET = './data/gamine.csv'

const getPercentile = (arr, percentile) => {
  const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * percentile;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
    } else {
        return Math.floor(sorted[base]);
    }
}

const fishHookDataFetcher = new Promise((resolve, reject) => {
  const results = [];
    fs.createReadStream(path.join(__dirname, HOOKFISH_DATA_SET))
    .pipe(csvparser())
    .on('data', (data) => results.push(data))
    .on('end', resolve(results));
})

const gamineDataFetcher = new Promise((resolve, reject) => {
  const results = [];
    fs.createReadStream(path.join(__dirname, GAMINE_DATA_SET))
    .pipe(csvparser())
    .on('data', (data) => results.push(data))
    .on('end', resolve(results));
})

const getTotalCompRanges = (data) => {
  const totalComps = data.map(({ salary, bonus }) => parseInt(salary) + parseInt(bonus));

  return {
    p10: getPercentile(totalComps, 0.10),
    p25: getPercentile(totalComps, 0.25),
    p50: getPercentile(totalComps, 0.50),
    p75: getPercentile(totalComps, 0.75),
    p90: getPercentile(totalComps, 0.90),
  }
}

const getSalaryRanges = (data) => {
  const salaries = data.map(({ salary, bonus }) => parseInt(salary));

  return {
    p10: getPercentile(salaries, 0.10),
    p25: getPercentile(salaries, 0.25),
    p50: getPercentile(salaries, 0.50),
    p75: getPercentile(salaries, 0.75),
    p90: getPercentile(salaries, 0.90),
  }
}

const getBonusRanges = (data) => {
  const bonuses = data.map(({ salary, bonus }) => parseInt(bonus));

  return {
    p10: getPercentile(bonuses, 0.10),
    p25: getPercentile(bonuses, 0.25),
    p50: getPercentile(bonuses, 0.50),
    p75: getPercentile(bonuses, 0.75),
    p90: getPercentile(bonuses, 0.90),
  }
}

const getEmploymentTypeCompRange = (data) => {
  const contractors = data.filter(({ employmentType }) => employmentType === 'contractor');
  const fulltimeEmployees = data.filter(({ employmentType }) => employmentType === 'fullTime');

  return [
    { employmentType: 'contractor', range: getTotalCompRanges(contractors) }, 
    { employmentType: 'fullTime', range: getTotalCompRanges(fulltimeEmployees) }
  ]
}

const getEmploymentSalaryRange = (data) => {
  const contractors = data.filter(({ employmentType }) => employmentType === 'contractor');
  const fulltimeEmployees = data.filter(({ employmentType }) => employmentType === 'fullTime');

  return [
    { employmentType: 'contractor', range: getSalaryRanges(contractors) }, 
    { employmentType: 'fullTime', range: getSalaryRanges(fulltimeEmployees) }
  ]
}

const getEmploymentBonusRange = (data) => {
  const contractors = data.filter(({ employmentType }) => employmentType === 'contractor');
  const fulltimeEmployees = data.filter(({ employmentType }) => employmentType === 'fullTime');

  return [
    { employmentType: 'contractor', range: getBonusRanges(contractors) }, 
    { employmentType: 'fullTime', range: getBonusRanges(fulltimeEmployees) }
  ]
}

const getGenderCompRange = (data) => {
  const male = data.filter(({ gender }) => gender === 'Male');
  const female = data.filter(({ gender }) => gender === 'Female');

  return [
    { gender: 'Male', range: getTotalCompRanges(male) }, 
    { gender: 'Female', range: getTotalCompRanges(female) }
  ]
}

const getDepartmentCompRange = (data) => {
  const operations = data.filter(({ department }) => department === 'Operations');
  const management = data.filter(({ department }) => department === 'Management');
  const frontOfHouse = data.filter(({ department }) => department === 'FrontOfHouse');
  const kitchen = data.filter(({ department }) => department === 'Kitchen');

  return [
    { department: 'Operations', range: getTotalCompRanges(operations) }, 
    { department: 'Management', range: getTotalCompRanges(management) },
    { department: 'FrontOfHouse', range: getTotalCompRanges(frontOfHouse) },
    { department: 'Kitchen', range: getTotalCompRanges(kitchen) },
  ]
}

const getLevelCompRange = (data) => {
  const map = {};
  
  data.forEach((row) => {
    if (map[row.level]) {
      map[row.level].push(row);
    } else {
      map[row.level] = [];
    }
  });

  return Object.keys(map).map((key) => ({ level: key, range: getTotalCompRanges(map[key]) }));
}

const getGenderSalaryRange = (data) => {
  const male = data.filter(({ gender }) => gender === 'Male');
  const female = data.filter(({ gender }) => gender === 'Female');

  return [
    { gender: 'Male', range: getSalaryRanges(male) }, 
    { gender: 'Female', range: getSalaryRanges(female) }
  ]
}

const getGenderBonusRange = (data) => {
  const male = data.filter(({ gender }) => gender === 'Male');
  const female = data.filter(({ gender }) => gender === 'Female');

  return [
    { gender: 'Male', range: getBonusRanges(male) }, 
    { gender: 'Female', range: getBonusRanges(female) }
  ]
}

const getRestaurantCompRanges = async () => {
  const fishHookData = await fishHookDataFetcher
  const gamineData = await gamineDataFetcher

  return [
    { 
      name: 'Hookfish',
      range: getTotalCompRanges(fishHookData), 
      genderRange: getGenderCompRange(fishHookData),
      employmentTypeRange: getEmploymentTypeCompRange(fishHookData), 
      departmentCompRange: getDepartmentCompRange(fishHookData),
      levelCompRange: getLevelCompRange(fishHookData)
    }, 
    { 
      name: 'Gamine', 
      range: getTotalCompRanges(gamineData),
      genderRange: getGenderCompRange(gamineData),
      employmentTypeRange: getEmploymentTypeCompRange(gamineData),
      departmentCompRange: getDepartmentCompRange(gamineData),
      levelCompRange: getLevelCompRange(gamineData)
    }
  ]
}

const getRestaurantSalaryRanges = async () => {
  const fishHookData = await fishHookDataFetcher
  const gamineData = await gamineDataFetcher

  return [
    { 
      name: 'Hookfish', 
      range: getSalaryRanges(fishHookData), 
      genderRange: getGenderSalaryRange(fishHookData),
      employmentTypeRange: getEmploymentSalaryRange(fishHookData) 
    }, 
    { 
      name: 'Gamine', 
      range: getSalaryRanges(gamineData), 
      genderRange: getGenderSalaryRange(gamineData),
      employmentTypeRange: getEmploymentSalaryRange(gamineData) 
    }
  ]
}

const getRestaurantBonusRanges = async () => {
  const fishHookData = await fishHookDataFetcher
  const gamineData = await gamineDataFetcher


  return [
    { 
      name: 'Hookfish',
      range: getBonusRanges(fishHookData), 
      genderRange: getGenderBonusRange(fishHookData),
      employmentTypeRange: getEmploymentBonusRange(fishHookData) 
    }, 
    { 
      name: 'Gamine',
      range: getBonusRanges(gamineData), 
      genderRange: getGenderBonusRange(gamineData),
      employmentTypeRange: getEmploymentBonusRange(gamineData) 
    }
  ]
}


exports.getRestaurantCompRanges = getRestaurantCompRanges; 
exports.getRestaurantSalaryRanges = getRestaurantSalaryRanges; 
exports.getRestaurantBonusRanges = getRestaurantBonusRanges;  