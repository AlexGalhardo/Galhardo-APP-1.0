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