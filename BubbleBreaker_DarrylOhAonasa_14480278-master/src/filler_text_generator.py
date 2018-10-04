from random import randint
from config_constants import (POS_POS, POS_NEG, NEG_POS, NEG_NEG,
    NEU_NEU, NEU_POS, NEU_NEG, ROOT_POS, ROOT_NEG, ROOT_NEU, IGNORE_OPTIONS
)


class FillerTextGenerator:

    def generate_text_for_root(self, comment, comment_type):
        text = ""

        if comment_type == '+':
            text = ROOT_POS[randint(0, len(ROOT_POS) - 1)].text
        elif comment_type == '-':
            text = ROOT_NEG[randint(0, len(ROOT_NEG) - 1)].text
        else:
            text = ROOT_NEU[randint(0, len(ROOT_NEU) - 1)].text

        return text.format(comment.author())


    def generate_text(self, parent_comment, child_comment, parent_type, child_type):
        text = ""

        # Select based on relationship category
        if parent_type == '+' and child_type == '+': # POS_POS
            index = self.__get_index(POS_POS)
            text = POS_POS[index].text
            IGNORE_OPTIONS.append(POS_POS[index].ID)

        elif parent_type == '+' and child_type == '-': # POS_NEG
            index = self.__get_index(POS_NEG)
            text = POS_NEG[index].text
            IGNORE_OPTIONS.append(POS_NEG[index].ID)

        elif parent_type == '-' and child_type == '+': # NEG_POS
            index = self.__get_index(NEG_POS)
            text = NEG_POS[index].text
            IGNORE_OPTIONS.append(NEG_POS[index].ID)

        elif parent_type == '-' and child_type == '-': # NEG_NEG
            index = self.__get_index(NEG_NEG)
            text = NEG_NEG[index].text
            IGNORE_OPTIONS.append(NEG_NEG[index].ID)

        elif parent_type == 'N' and child_type == 'N': # NEU_NEU
            index = self.__get_index(NEU_NEU)
            text = NEU_NEU[index].text
            IGNORE_OPTIONS.append(NEU_NEU[index].ID)

        elif parent_type == 'N' and child_type == '+': # NEU_POS
            index = self.__get_index(NEU_POS)
            text = NEU_POS[index].text
            IGNORE_OPTIONS.append(NEU_POS[index].ID)

        elif parent_type == 'N' and child_type == '-': # NEU_NEG
            index = self.__get_index(NEU_NEG)
            text = NEU_NEG[index].text
            IGNORE_OPTIONS.append(NEU_NEG[index].ID)

        return text.format(child_comment.author())


    # Deletes the options stored in the ignore array.
    def clear_ignore_options(self):
        IGNORE_OPTIONS.clear()


    # Selects a filler text option index, excluding those already contained in 'ignore_options' array.
    def __get_index(self, array):
        index = -1
        max_iterations = len(array) ** 3

        # how to avoid infinite loops when there are no more options for that category?
        # Make an assumption about the length of the passed list. The lenght indicates how
        # many potential options there are, whereas 'IGNORE_OPTIONS' tracks unusable ones.
        # Assume that the random generator will have selected a valid index should it exist,
        # within len(list) ^ 2/3 checks. If not, reset the IGNORE list, and
        # simple return index 0 for the filler option.

        while max_iterations > 0:
            index = randint(0, len(array) - 1)

            if array[index].ID not in IGNORE_OPTIONS:
                return index
            else:
                max_iterations -= 1

        # Wipe the IGNORE_OPTIONS array
        self.clear_ignore_options()

        return 0





