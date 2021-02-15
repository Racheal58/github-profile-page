
fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authorization: `Bearer 38c6b1f080a2d7def31c67476c6bda559781d22f` },
    body: JSON.stringify({ query: `
    query {
        user(login: "racheal58") {
            id
            url
            name
            login
            bioHTML
            avatarUrl
            repositories(first: 20) {
                totalCount
                nodes {
                    name
                    description
                    stargazerCount
                    forkCount
                    licenseInfo {
                        id
                        name
                    }
                    updatedAt
                    primaryLanguage {
                        id
                        color
                        name
                    }
                    isPrivate
                    isFork
                    owner {
                        id
                        resourcePath
                    }
                }
            }
        }
    }`  
    }),
})
.then(res => res.json())
.then(res => {
    document.querySelector(".full_name").innerHTML = res.data.user.name;
    document.querySelector('.username').innerHTML = res.data.user.login;
    document.querySelector('.profile_bio').innerHTML = res.data.user.bioHTML;
    document.querySelector('.badge').innerHTML = res.data.user.repositories.totalCount;
    document.querySelector('.avatar').src = res.data.user.avatarUrl;
    document.querySelector('.small_avatar').src = res.data.user.avatarUrl;
    document.querySelector('#loader').style.display = 'none';
    document.querySelector('.parent').style.display = 'block';

    let output = "";
    res.data.user.repositories.nodes.forEach(element => {
        let today = new Date(element.updatedAt);
        output += `<div class="repositories__result">
        <div class="d-flex justify-content-between w-100">
            <a href="javascript:;">
                <h3>${element.name}</h3>
            </a>
            <button class="btn">
                <span class="iconify" 
                    data-icon="octicon:star-16"
                    data-inline="false"
                    data-width="16"
                    data-height="16">
                </span>
                Star
            </button>
        </div>
        <p>
            ${element.description ? element.description : ""}
        </p>
        <div class="d-flex repositories__footer">
            <div>
                <span class="lang-indicator" style="background-color: ${element.primaryLanguage.color}"></span>
                ${element.primaryLanguage.name}
            </div>
            <div>
                <span class="iconify"
                    data-icon="octicon:star-16"
                    data-inline="true"
                    data-width="16"
                    data-height="16">
                </span> 
                ${element.stargazerCount}
            </div>
            <div>
                <span class="iconify"
                    data-icon="octicon:repo-forked-16"
                    data-inline="true"
                    data-width="16"
                    data-height="16">
                </span>
                ${element.forkCount}
            </div>
            <div>
                <span class="iconify"
                    data-inline="true"
                    data-width="16"
                    data-height="16">
                </span>
                Updated ${today.toDateString()}
            </div>
        </div>
    </div>` 
    document.querySelector(".repositories_section").innerHTML = output;
    });
});