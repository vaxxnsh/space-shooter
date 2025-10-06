type Questions = {
    question : string
    options : string[]
    correct_index : number
}

const dummyQuestion : Questions[] = [
    {
        question: "Which of the following is the correct file extension for Python files?",
        options: [".pt", ".pyt", ".py", ".p"],
        correct_index: 2
    },
    {
        question: "What is the output of: print(type([]))?",
        options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"],
        correct_index: 0
    },
    {
        question: "Which keyword is used to create a function in Python?",
        options: ["def", "func", "function", "lambda"],
        correct_index: 0
    },
    {
        question: "What does the 'len()' function do?",
        options: ["Returns the type of variable", "Returns the number of items", "Converts to list", "Adds elements"],
        correct_index: 1
    },
    {
        question: "Which of these is a mutable data type in Python?",
        options: ["tuple", "str", "list", "frozenset"],
        correct_index: 2
    }
]
