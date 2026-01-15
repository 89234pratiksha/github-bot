import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import Random from "random";  // <- fix import

const path = "./data.json";
const makeCommits = (n) => {
    if(n === 0) return simpleGit();

    const x = Random.int(0, 54);
    const y = Random.int(0, 6);
    const date = moment().subtract(1,"y").add(1,"d").add(x,"w").add(y,"d").format();

    const data = { date };
    console.log(date);

    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path])
                   .commit(date, {'--date': date}, makeCommits.bind(this, --n));
    });
};

makeCommits(100);
