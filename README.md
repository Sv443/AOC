# [Advent of Code 2021](https://adventofcode.com/2021)

## My solutions

<br><br>

### To run:

Clone with git or download and extract (green button).  
Install Node.js (preferably v14+) and open a terminal in the project directory.  
Install dependencies with `npm i`, then use the command `npm start`  
It will prompt you to enter the day of which to run the code. Press ESC or enter `0` to run the latest day's code.  
Alternatively, use `node day/x`, where x could be any valid day of the advent.

<br><br>

### Info:

Code can be found in the [`./day/`](./day/) folder, under each day's subfolder.

The latest version is on the branch `develop`.  
I'm doing this to prevent spoiling anyone. If you really want to look at my current day's solution, you can though.  
The day after, I will add it to the `master` branch.

<br><br>

### Commands:

<br>

> #### For starting the script there are these commands:
>
> <br>
>
> | Command      | Description                                                                                               |
> | :----------- | :-------------------------------------------------------------------------------------------------------- |
> | `npm start`  | Starts a prompt, asking you which day's code to run. Press ESC or enter `0` to run the latest day's code. |
> | `node . -l`  | Directly runs the latest day's code.                                                                      |
> | `node day/x` | Directly runs the code of day `x`. Argument `-l` aka `--latest` takes precedence over the specified day.  |

<br>

> #### For development, there are these:
>
> <br>
>
> | Command       | Description                                                                                                                    |
> | :------------ | :----------------------------------------------------------------------------------------------------------------------------- |
> | `npm run new` | Create a new day subfolder. Infers the latest day from the biggest value found in [`./day/`](./day/) - Alias: `npm run create` |
