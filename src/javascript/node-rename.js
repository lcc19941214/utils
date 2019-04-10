const fs = require('fs');
const path = require('path');

const timeMap = {
  night: 3,
  morning: 1,
  afternoon: 2
};

const route = process.cwd();

const files = fs.readdirSync(route);
files.forEach(file => {
  if (file.match(/week/)) {
    try {
      const newName = file.replace(/week-(\d) (\w+) (@\dx\.jpg)/, function(
        str,
        match1,
        match2,
        match3
      ) {
        return `${match1}_${timeMap[match2]}${match3}`;
      });
      fs.renameSync(path.resolve(route, file), path.resolve(route, newName));
    } catch (error) {
      console.log(error);
    }
  }
});

