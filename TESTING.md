# **Testing** 

* [Functionality Testing](#functionality-testing)
* [Code Validation](#code-validation)
* [Performance](#performance)
* [Bug Fixes](#bug-fixes)


## **Functionality Testing**


## **Bug Fixes**

During development I discovered and fixed the following bugs in my code;
* Players were able to win the game by finding one correct letter and repeatedly selecting it until they won. This bug was fixed in commit fe8cdad
* Players could activate the buttons before a game started. This bug was fixed in commit 634f257
* The counter to determine the end of the game was too long allowing players to have an extra guess. This bug was fixed in commit b7304bd.
* After adding the functionality for players to choose letters using keypresses players could continue playing after the win/loss condition was reached. This bug was fixed in commit 9ee8456.
* Players could reset the timer by selecting already guessed letters. This bug was fixed in commits 310bb94 and f87e45e
* While adding the timer a typo was added to the checkGuess function which prevented the game from running. This was fixed in commit 69a85b2
* The game would not time out when the sound was enabled. This bug was fixed in commit 72d09c8
