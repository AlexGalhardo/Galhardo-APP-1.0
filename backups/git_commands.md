- $ git checkout -v new-branch
- $ git add .
- $ git commit –m "Some commit message"
- $ git checkout master
- $ git merge new-branch

- $ git remote rename origin github
- $ git push --all origin


- To kill any process listening to the port 3000:
   - kill $(lsof -t -i:3000)

- To simplify that aswell you can run git push --all github -u once and now all you’ll have to do is git push. This will now by default push all branches to the default remote github.

- https://stackoverflow.com/questions/68775869/support-for-password-authentication-was-removed-please-use-a-personal-access-to
- For Linux based OS
- For Linux, You need to configure the local GIT client with a username and email address,

- $ git config --global user.name ""
- $ git config --global user.email ""
- $ git config -l
- Once GIT is configured, we can begin using it to access GitHub. Example :

- $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
   - $ Username for 'https://github.com' : username
   - $ Password for 'https://github.com' : give your personal access token here
- Now cache the given record in your computer to remembers the token :
   - $ git config --global credential.helper cache
- If needed, anytime you can delete the cache record by :
   - git config --global --unset credential.helper