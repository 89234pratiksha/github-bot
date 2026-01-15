import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import Random from "random";

const git = simpleGit();   // use once
const path = "./data.json";

const makeCommits = async (n) => {
    if (n === 0) return;

    // Random past date
    const x = Random.int(0, 54);
    const y = Random.int(0, 6);

    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d")
        .format();

    // Write JSON
    jsonfile.writeFileSync(path, { date });

    // Stage and commit with backdate
    await git.add([path]);
    await git.commit(`Commit for ${date}`, path, { "--date": date });

    console.log(`Committed: ${date}`);

    // Next commit
    await makeCommits(n - 1);
};

// Run 100 past commits
makeCommits(100).then(() => console.log("All commits done"));
