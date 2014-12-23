!#/bin/sh


echo "==================="
echo "Checking Git Status"
echo "==================="
git status
echo "==============================================="
echo "Commiting changes, please enter commit message:"
read COMMITMSG
echo "==============================================="
git add --all
git commit -m "$COMMITMSG"
echo "========================="
echo "Pushing changes to GitHub"
echo "========================="
git push origin develop
echo "====================================="
echo "Bulding App. This may take a while..."
echo "====================================="
grunt --force
echo "===================================="
echo "Changing dir to ~/node/convideo/dist"
echo "===================================="
cd ~/node/convideo/dist
echo "======================="
echo "Commiting build changes"
echo "======================="
git add --all
git commit -m "$COMMITMSG"
echo "==============================="
echo "Pushing build changes to GitHub"
echo "==============================="
git push origin master
echo "================================"
echo "Changing dir to ~/node/conavideo"
echo "================================"
cd ~/node/conavideo
echo "==========================="
echo "Pulling changes from GitHub"
echo "==========================="
git pull origin master
echo "==========="
echo "ALL DONE!!!"
echo "==========="
