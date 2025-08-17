#!/bin/sh

set -e

if [ -z "$husky_skip_init" ]; then
  hookName="$(basename "$0")"
  [ "$HUSKY" = "0" ] && exit 0
  if [ -f ~/.huskyrc ]; then
    . ~/.huskyrc
  fi
  export husky_skip_init=1
  sh "$0" "$@"
  exitCode="$?"
  exit $exitCode
fi