#!/bin/sh

RED='\033[0;31m'
GRE='\033[0;32m'
NC='\033[0m' # No Color

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".tsx\{0,1\}$")

if [[ "$STAGED_FILES" = "" ]]; then
   echo "no file to checking"
   exit 0
fi

PASS=true

echo "checking started"
echo "================"

# Check for eslint
ls node_modules/eslint/bin/eslint.js &> /dev/null
if [[ "$?" == 1 ]]; then
  echo -e "${RED}error:${NC} eslint not installed"
  exit 1
fi

for FILE in $STAGED_FILES
do
  SERVICE="$(cut -d'/' -f1 <<<"$FILE")"
  node_modules/.bin/eslint -c .eslintrc $FILE

  if [[ "$?" == 0 ]]; then
    echo -e "${GRE}passed:${NC} $FILE"
  else
    echo -e "${RED}failed:${NC} $FILE"
    PASS=false
  fi
done

echo ""
echo "================"

if ! $PASS; then
  echo -e "${GRE}checking failed:${NC} Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again."
  exit 1
else
  echo -e "checking success"
  echo "================"
  echo ""
fi

exit $?
