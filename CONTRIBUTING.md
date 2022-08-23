## How To Contribute
- Fork this repository. 
Click the gray `Fork` button in the top right of this page. This creates *your* copy of the project and saves it as a new repository in your github account


- Open your text editor and  Clone your forked repository 
```js
  git clone https://github.com/YOUR_GITHUB_USERNAME/t_c-generator-team71.git
```


- Switch to the cloned folder. If you're already in it, then skip this process 
```js
  cd t_c-generator-team71
```


- Run the command `git status`. You should get a response like this
```js
    On branch master
    Your branch is up to date with 'origin/master'
```


- Create a new branch for the feature you are adding and switch to that branch
```js
    git checkout -b <your_branch_name>
```

- Add your changes.


- After adding your changes, navigate back to the root directory. Run `cd..` till the root directory is the last path
```js
    C:\Users\hp\Desktop\Merckury\zuri-training\t_c-generator-team71>
```


- Stage your changes
```js
    git add "<name_of_your_file>"
```

or 

```js
    git add .
```


- Commit your changes
```js
    git commit -m "<commit_mes>"
```


- Push your changes
- If you are PUSHING FOR THE FIRST TIME, set your upstream branch to the new branch you created and push that branch to your forked repo
```js
    git push --set-upstream origin <your_branch_name>
```
- If you have PUSHED A CHANGE BEFORE, but you want to push some more changes later. Run
```js
    git push origin <your_branch_name>
```


- Run `git status` and you should get a response like this
```js
    "On branch <your_branch_name>"
    "Your branch is up to date with 'origin/<your_branch_name>'."
```


- Go to your forked Repo on Github and Create a pull request

- Before you compare and create a pull request, make sure the base directory is `zuri-training/t_c-generator-team71` and the base branch is set to `develop`.<br />

![Comparing pull request](https://user-images.githubusercontent.com/80987589/186118807-32df25fb-0e02-4e38-8a51-a5a2bd347512.jpeg)

- Once that is done, Click on the `Create Pull Request`


- #### DO NOT MERGE YOUR PULL REQUEST!