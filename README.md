# Word Master — Greek version — Λεξιγνώστης

🔗 https://dspinellis.github.io/word-master/

Heavily inspired by [Wordle](https://www.powerlanguage.co.uk/wordle/), Word Master is a word guessing game similar to Mastermind.
This Greek word version is almost completely based on the
[original English word version](https://github.com/octokatherine/word-master),
which can be played [here](https://octokatherine.github.io/word-master/).

The original author of Word Master,
[Katherine Peterson](https://github.com/octokatherine),
created it because she loved Wordle,
but the once a day limit left her wanting more.
I forked her version and converted it to use Greek words,
because I love the Greek language,
and have been writing software to support Greek for the past 40 years.
I was also fortunate to use the, now widely adopted, Greek dictionary originally
created by Giannis Mitalas and Nikos Seraskeris as a
[thesis project](https://www2.dmst.aueb.gr/dds/sw/greek/ispell/)
I supervised at the University of the Aegean in 1999.

I created the list of acceptable words by filtering the
[Greek dictionary](https://github.com/LibreOffice/dictionaries/tree/master/el_GR)
of [Hunspell](http://hunspell.github.io/) to remove proper nouns
and words that are not five characters long.
I created the list of candidate words by obtaining the
2079 (same number as in the English version) most common words
in the [Greek Wikipedia](https://el.wikipedia.org/)
that were in the acceptable words list.
The Unix shell script for creating the two lists is
available
[here](https://github.com/dspinellis/word-master/blob/main/src/data/mklists.sh).

## Rules

You have 6 guesses to guess the correct word.
Each guess can be any valid word.

After submitting a guess, the letters will turn gray, green, or yellow.

- Green: The letter is correct, in the correct position.
- Yellow: The letter is correct, but in the wrong position.
- Gray: The letter is incorrect.

## Contributing

Feel free to open an issue for any bugs or feature requests.

To contribute to the code, see [CONTRIBUTING.md](https://github.com/dspinellis/word-master/blob/main/CONTRIBUTING.md)

## See also

The [Wordles of the world](https://rwmpelstilzchen.gitlab.io/wordles/) list
contains a comprehensive collection of Wordle-like games in diverse languages.
You can also [play](https://dspinellis.github.io/word-master-ancient-greek/)
or [browse the source code](https://github.com/dspinellis/word-master-ancient-greek) of a
version I created using the vocabulary of Ancient Greek.
