import { n as db, t as auth } from "./client-CNOuFmVY.js";
import { t as SECTIONS } from "./a2z-data-DMDTdYSE.js";
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
//#region src/lib/types.ts
var weekNumber = (dayNumber) => Math.ceil(dayNumber / 7);
//#endregion
//#region src/lib/tuf-links.ts
/**
* tuf-links.ts — Direct TakeUForward article URLs for every Striver A2Z problem.
* Key = exact problem name from a2z-data.ts
* Missing entries fall back to: https://takeuforward.org/?s=<encoded-name>
*
* VERIFIED: August 2026
* TUF migrated most articles from category-specific paths (/arrays/, /binary-search/,
* /linked-list/, /bit-manipulation/, /stack-queue/, /heap/, /dynamic-programming/,
* /trie/, /string/) to /data-structure/ paths. All URLs below are confirmed live.
*/
var TUF_LINKS = {
	"User Input / Output": "https://takeuforward.org/c/c-basic-input-output",
	"Data Types": "https://takeuforward.org/c/data-types-in-c",
	"If Else statements": "https://takeuforward.org/c/if-else-in-c-c",
	"For loops": "https://takeuforward.org/c/for-loop-in-c-c",
	"While loops": "https://takeuforward.org/c/while-loop-in-c-c",
	"Functions (Pass by Reference and Value)": "https://takeuforward.org/data-structure/functions-pass-by-reference-and-value",
	"Time Complexity [Learn Basics]": "https://takeuforward.org/data-structure/time-complexity",
	"Patterns: Rectangular Star Pattern": "https://takeuforward.org/data-structure/pattern-1-rectangular-star-pattern",
	"Patterns: Right-Angled Triangle": "https://takeuforward.org/data-structure/pattern-2-right-angled-triangle-pattern",
	"Patterns: Right-Angled Number Triangle": "https://takeuforward.org/data-structure/pattern-3-right-angled-number-pyramid",
	"Patterns: Inverted Right Pyramid": "https://takeuforward.org/data-structure/pattern-5-inverted-right-pyramid",
	"Patterns: Floyd's Triangle": "https://takeuforward.org/data-structure/pattern-4-right-angled-number-pyramid-ii",
	"Patterns: Inverted Numeric Right Triangle": "https://takeuforward.org/data-structure/pattern-6-inverted-numbered-right-pyramid",
	"Patterns: Star Pyramid": "https://takeuforward.org/data-structure/pattern-7-star-pyramid",
	"Patterns: Inverted Star Pyramid": "https://takeuforward.org/data-structure/pattern-8-inverted-star-pyramid",
	"Patterns: Diamond Star Pattern": "https://takeuforward.org/data-structure/pattern-9-diamond-star-pattern",
	"Patterns: Half Diamond Star Pattern": "https://takeuforward.org/data-structure/pattern-10-half-diamond-star-pattern",
	"Patterns: Binary Number Triangle": "https://takeuforward.org/data-structure/pattern-11-binary-number-triangle-pattern",
	"Patterns: Number Crown": "https://takeuforward.org/data-structure/pattern-12-number-crown-pattern",
	"Patterns: Increasing Letter Triangle": "https://takeuforward.org/data-structure/pattern-14-increasing-letter-triangle-pattern",
	"Patterns: Reverse Letter Triangle": "https://takeuforward.org/data-structure/pattern-15-reverse-letter-triangle-pattern",
	"Patterns: Alpha-Ramp Pattern": "https://takeuforward.org/data-structure/pattern-17-alpha-ramp-pattern",
	"Patterns: Alpha-Hill Pattern": "https://takeuforward.org/data-structure/pattern-18-alpha-hill-pattern",
	"Patterns: Symmetric Void Pattern": "https://takeuforward.org/data-structure/pattern-20-symmetric-void-pattern",
	"Patterns: Star Butterfly Pattern": "https://takeuforward.org/data-structure/pattern-21-star-butterfly-pattern",
	"Patterns: Hollow Rectangle": "https://takeuforward.org/data-structure/pattern-22-hollow-rectangle-pattern",
	"Patterns: Concentric Rectangle": "https://takeuforward.org/data-structure/pattern-23-concentric-rectangle-pattern",
	"What are arrays, strings?": "https://takeuforward.org/c/arrays-and-strings-in-c",
	"C++ STL / Java Collections": "https://takeuforward.org/c/c-stl-tutorial-most-frequent-used-stl-algorithms",
	"Count Digits": "https://takeuforward.org/data-structure/count-digits-in-a-number",
	"Reverse a Number": "https://takeuforward.org/data-structure/reverse-digits-of-a-number",
	"Palindrome Number": "https://takeuforward.org/data-structure/check-if-a-number-is-palindrome-or-not",
	"GCD or HCF": "https://takeuforward.org/data-structure/find-gcd-of-two-numbers",
	"Armstrong Number": "https://takeuforward.org/data-structure/check-if-a-number-is-armstrong-number-or-not",
	"Print all Divisors": "https://takeuforward.org/data-structure/print-all-divisors-of-a-number",
	"Check for Prime": "https://takeuforward.org/data-structure/check-if-a-number-is-prime-or-not",
	"Recursion: Print name N times": "https://takeuforward.org/recursion/print-name-n-times-using-recursion",
	"Recursion: Print 1 to N": "https://takeuforward.org/recursion/print-1-to-n-using-recursion",
	"Recursion: Print N to 1": "https://takeuforward.org/recursion/print-n-to-1-using-recursion",
	"Recursion: Sum of first N numbers": "https://takeuforward.org/recursion/sum-of-first-n-numbers",
	"Recursion: Factorial of N numbers": "https://takeuforward.org/recursion/factorial-using-recursion",
	"Reverse an array": "https://takeuforward.org/data-structure/reverse-a-given-array",
	"Check if a string is palindrome": "https://takeuforward.org/data-structure/check-if-the-string-is-palindrome-or-not",
	"Fibonacci Number using recursion": "https://takeuforward.org/recursion/fibonacci-series-using-recursion",
	"Hashing Theory": "https://takeuforward.org/data-structure/hashing-maps-time-complexity-design-hashmap-hashset",
	"Counting frequencies of array elements": "https://takeuforward.org/data-structure/count-frequency-of-each-element-in-the-array",
	"Find the highest/lowest frequency element": "https://takeuforward.org/data-structure/find-the-highest-lowest-frequency-element",
	"Selection Sort": "https://takeuforward.org/sorting/selection-sort-algorithm",
	"Bubble Sort": "https://takeuforward.org/sorting/bubble-sort-algorithm",
	"Insertion Sort": "https://takeuforward.org/sorting/insertion-sort-algorithm",
	"Merge Sort": "https://takeuforward.org/sorting/merge-sort-algorithm",
	"Recursive Bubble Sort": "https://takeuforward.org/data-structure/recursive-bubble-sort",
	"Recursive Insertion Sort": "https://takeuforward.org/data-structure/recursive-insertion-sort",
	"Quick Sort": "https://takeuforward.org/sorting/quick-sort-algorithm",
	"Largest Element in an Array": "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array",
	"Second Largest Element in an Array without sorting": "https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array",
	"Check if the array is sorted": "https://takeuforward.org/data-structure/check-if-an-array-is-sorted",
	"Remove duplicates from Sorted array": "https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array",
	"Left Rotate an array by one place": "https://takeuforward.org/data-structure/left-rotate-the-array-by-one",
	"Left rotate an array by D places": "https://takeuforward.org/data-structure/rotate-array-by-k-elements",
	"Move Zeros to end": "https://takeuforward.org/data-structure/move-zeros-to-end",
	"Linear Search": "https://takeuforward.org/data-structure/linear-search-in-an-array",
	"Union of Two Sorted Arrays": "https://takeuforward.org/data-structure/union-of-two-sorted-arrays",
	"Find missing number in an array": "https://takeuforward.org/data-structure/find-the-missing-number-in-an-array",
	"Maximum Consecutive Ones": "https://takeuforward.org/data-structure/count-maximum-consecutive-ones-in-the-array",
	"Find the number that appears once, and other numbers twice": "https://takeuforward.org/data-structure/find-the-number-that-appears-once-and-the-other-numbers-twice",
	"Find the number that appears once, others twice": "https://takeuforward.org/data-structure/find-the-number-that-appears-once-and-the-other-numbers-twice",
	"Longest subarray with given sum K(positives)": "https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k-positives",
	"Longest subarray with given sum K (positives)": "https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k-positives",
	"Longest subarray with sum K (Positives + Negatives)": "https://takeuforward.org/data-structure/longest-subarray-with-sum-k-positives-and-negatives",
	"Longest subarray with sum K (positives + negatives)": "https://takeuforward.org/data-structure/longest-subarray-with-sum-k-positives-and-negatives",
	"2Sum Problem": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array",
	"Two Sum": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array",
	"Sort an array of 0's 1's and 2's": "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s",
	"Majority Element (>n/2 times)": "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times",
	"Kadane's Algorithm, maximum subarray sum": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array",
	"Kadane's Algorithm - Maximum Subarray Sum": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array",
	"Print subarray with maximum subarray sum": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array",
	"Stock Buy and Sell": "https://takeuforward.org/data-structure/stock-buy-and-sell",
	"Best Time to Buy and Sell Stock": "https://takeuforward.org/data-structure/stock-buy-and-sell",
	"Rearrange the array in alternating positive and negative items": "https://takeuforward.org/data-structure/rearrange-array-elements-by-sign",
	"Next Permutation": "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation",
	"Leaders in an Array problem": "https://takeuforward.org/data-structure/leaders-in-an-array",
	"Longest Consecutive Sequence in an Array": "https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array",
	"Set Matrix Zeros": "https://takeuforward.org/data-structure/set-matrix-zero",
	"Rotate Matrix by 90 degrees": "https://takeuforward.org/data-structure/rotate-image-by-90-degree",
	"Print the matrix in spiral manner": "https://takeuforward.org/data-structure/spiral-traversal-of-matrix",
	"Count subarrays with given sum": "https://takeuforward.org/data-structure/count-subarray-sum-equals-k",
	"Subarray sum equals K": "https://takeuforward.org/data-structure/count-subarray-sum-equals-k",
	"Pascal's Triangle": "https://takeuforward.org/data-structure/program-to-generate-pascals-triangle",
	"Majority Element (n/3 times)": "https://takeuforward.org/data-structure/majority-elementsn-3-times-find-the-elements-that-appears-more-than-n-3-times-in-the-array",
	"3-Sum Problem": "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero",
	"4-Sum Problem": "https://takeuforward.org/data-structure/4-sum-find-quads-that-add-up-to-a-target-value",
	"Largest Subarray with 0 Sum": "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum",
	"Longest subarray with equal 0s and 1s": "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum",
	"Count number of subarrays with given xor K": "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k",
	"Merge Overlapping Sub-intervals": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals",
	"Merge Intervals": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals",
	"Merge two sorted arrays without extra space": "https://takeuforward.org/data-structure/merge-two-sorted-arrays-without-extra-space",
	"Find the repeating and missing number": "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers",
	"Count Inversions": "https://takeuforward.org/data-structure/count-inversions-in-an-array",
	"Reverse Pairs": "https://takeuforward.org/data-structure/count-reverse-pairs",
	"Maximum Product Subarray": "https://takeuforward.org/data-structure/maximum-product-subarray-in-an-array",
	"Find the Union and Intersection of two sorted arrays": "https://takeuforward.org/data-structure/union-of-two-sorted-arrays",
	"Rotate array by K elements": "https://takeuforward.org/data-structure/rotate-array-by-k-elements",
	"Check if array is sorted and rotated": "https://takeuforward.org/data-structure/check-if-an-array-is-sorted",
	"Search in a 2D matrix": "https://takeuforward.org/data-structure/search-in-a-2-d-matrix",
	"Spiral traversal of matrix": "https://takeuforward.org/data-structure/spiral-traversal-of-matrix",
	"Binary Search to find X in sorted array": "https://takeuforward.org/data-structure/binary-search-explained",
	"Implement Lower Bound": "https://takeuforward.org/arrays/implement-lower-bound-bs-2",
	"Implement Upper Bound": "https://takeuforward.org/arrays/implement-upper-bound",
	"Search Insert Position": "https://takeuforward.org/arrays/search-insert-position",
	"Floor/Ceil in Sorted Array": "https://takeuforward.org/data-structure/floor-and-ceil-in-sorted-array",
	"Find the first or last occurrence of a given number in a sorted array": "https://takeuforward.org/data-structure/first-and-last-occurrences-in-array",
	"Find the first or last occurrence of a given number": "https://takeuforward.org/data-structure/first-and-last-occurrences-in-array",
	"Count occurrences of a number in a sorted array": "https://takeuforward.org/data-structure/count-occurrences-in-sorted-array",
	"Search in Rotated Sorted Array I": "https://takeuforward.org/data-structure/search-element-in-rotated-sorted-array",
	"Search in Rotated Sorted Array II": "https://takeuforward.org/data-structure/search-element-in-rotated-sorted-array-ii",
	"Find minimum in Rotated Sorted Array": "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array",
	"Find out how many times the array has been rotated": "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array",
	"Single element in a Sorted Array": "https://takeuforward.org/data-structure/single-element-in-a-sorted-array",
	"Find peak element": "https://takeuforward.org/data-structure/peak-element-in-array",
	"Find square root of a number in log n": "https://takeuforward.org/data-structure/find-square-root-of-a-number-in-log-n",
	"Find square root of a number": "https://takeuforward.org/data-structure/find-square-root-of-a-number-in-log-n",
	"Find the Nth root of a number": "https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search",
	"Koko Eating Bananas": "https://takeuforward.org/binary-search/koko-eating-bananas",
	"Minimum days to make M bouquets": "https://takeuforward.org/data-structure/minimum-days-to-make-m-bouquets",
	"Find the smallest Divisor": "https://takeuforward.org/data-structure/find-the-smallest-divisor-given-a-threshold",
	"Capacity to Ship Packages within D Days": "https://takeuforward.org/data-structure/capacity-to-ship-packages-within-d-days",
	"Kth Missing Positive Number": "https://takeuforward.org/data-structure/kth-missing-positive-number",
	"Aggressive Cows": "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution",
	"Book Allocation Problem": "https://takeuforward.org/data-structure/allocate-books-or-book-allocation-problem",
	"Split array - Largest Sum": "https://takeuforward.org/data-structure/split-array-largest-sum",
	"Painter's Partition": "https://takeuforward.org/data-structure/painters-partition",
	"Minimize Max Distance to Gas Station": "https://takeuforward.org/arrays/minimise-maximum-distance-between-gas-stations",
	"Median of 2 sorted arrays": "https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes",
	"Kth element of 2 sorted arrays": "https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays",
	"Find the row with maximum number of 1's": "https://takeuforward.org/data-structure/find-the-row-with-maximum-number-of-1s",
	"Search in a 2D matrix - II": "https://takeuforward.org/data-structure/search-in-a-2-d-matrix-ii",
	"Find Peak Element (2D Matrix)": "https://takeuforward.org/data-structure/peak-element-in-2d-matrix",
	"Matrix Median": "https://takeuforward.org/data-structure/median-of-row-wise-sorted-matrix",
	"Find the missing and repeating using binary search": "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers",
	"Remove outermost Paranthesis": "https://takeuforward.org/data-structure/remove-outermost-parentheses",
	"Remove outermost Parenthesis": "https://takeuforward.org/data-structure/remove-outermost-parentheses",
	"Reverse words in a given string / Palindrome Check": "https://takeuforward.org/data-structure/reverse-words-in-a-string",
	"Reverse words in a given string": "https://takeuforward.org/data-structure/reverse-words-in-a-string",
	"Largest odd number in a string": "https://takeuforward.org/data-structure/largest-odd-number-in-a-string",
	"Longest Common Prefix": "https://takeuforward.org/data-structure/longest-common-prefix",
	"Isomorphic String": "https://takeuforward.org/data-structure/isomorphic-strings",
	"check whether one string is a rotation of another": "https://takeuforward.org/data-structure/check-if-one-string-is-rotation-of-another",
	"Check whether one string is rotation of another": "https://takeuforward.org/data-structure/check-if-one-string-is-rotation-of-another",
	"Check if two strings are anagram of each other": "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other",
	"Check if two strings are anagram": "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other",
	"Sort Characters by frequency": "https://takeuforward.org/data-structure/sort-characters-by-frequency",
	"Maximum Nesting Depth of Paranthesis": "https://takeuforward.org/data-structure/maximum-nesting-depth-of-parentheses",
	"Maximum Nesting Depth of Parenthesis": "https://takeuforward.org/data-structure/maximum-nesting-depth-of-parentheses",
	"Roman Number to Integer and vice versa": "https://takeuforward.org/data-structure/roman-number-to-integer-and-vice-versa",
	"Implement Atoi": "https://takeuforward.org/data-structure/implement-atoi",
	"Count Number of Substrings": "https://takeuforward.org/data-structure/count-number-of-substrings-with-exactly-k-unique-characters",
	"Longest Palindromic Substring[Do it without DP]": "https://takeuforward.org/data-structure/longest-palindromic-substring",
	"Longest Palindromic Substring": "https://takeuforward.org/data-structure/longest-palindromic-substring",
	"Sum of Beauty of all substring": "https://takeuforward.org/data-structure/sum-of-beauty-of-all-substrings",
	"Sum of Beauty of all substrings": "https://takeuforward.org/data-structure/sum-of-beauty-of-all-substrings",
	"Reverse Every Word in A String": "https://takeuforward.org/data-structure/reverse-every-word-in-a-string",
	"Reverse every word in a string": "https://takeuforward.org/data-structure/reverse-every-word-in-a-string",
	"Count and say": "https://takeuforward.org/data-structure/count-and-say",
	"Shortest Palindrome": "https://takeuforward.org/data-structure/shortest-palindrome",
	"Longest happy prefix": "https://takeuforward.org/data-structure/longest-happy-prefix",
	"Introduction to LinkedList - construction and traversal": "https://takeuforward.org/data-structure/introduction-to-linked-list",
	"Insert a node in LinkedList": "https://takeuforward.org/data-structure/introduction-to-linked-list",
	"Delete a node in LinkedList": "https://takeuforward.org/data-structure/delete-a-node-in-linked-list",
	"Find the length of the linked list": "https://takeuforward.org/data-structure/find-the-length-of-linked-list",
	"Search an element in the LL": "https://takeuforward.org/data-structure/search-an-element-in-linked-list",
	"Introduction to DLL - learn about struct and iterations": "https://takeuforward.org/data-structure/introduction-to-doubly-linked-list",
	"Insert a node in DLL": "https://takeuforward.org/data-structure/introduction-to-doubly-linked-list",
	"Delete a node in DLL": "https://takeuforward.org/data-structure/delete-a-node-in-doubly-linked-list",
	"Reverse a DLL": "https://takeuforward.org/data-structure/reverse-a-doubly-linked-list",
	"Middle of a LinkedList": "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list",
	"Reverse a LinkedList [Iterative]": "https://takeuforward.org/data-structure/reverse-a-linked-list",
	"Reverse a LinkedList (Iterative)": "https://takeuforward.org/data-structure/reverse-a-linked-list",
	"Reverse a LL [Recursive]": "https://takeuforward.org/data-structure/reverse-a-linked-list",
	"Reverse a LL (Recursive)": "https://takeuforward.org/data-structure/reverse-a-linked-list",
	"Find the middle element of the LL": "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list",
	"Detect a loop in LL": "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list",
	"Find the starting point in LL": "https://takeuforward.org/data-structure/starting-point-of-loop-in-linked-list",
	"Length of Loop in LL": "https://takeuforward.org/data-structure/length-of-loop-in-linked-list",
	"Check if LL is palindrome or not": "https://takeuforward.org/data-structure/check-if-the-linked-list-is-palindrome",
	"Segregate odd and even nodes in LL": "https://takeuforward.org/data-structure/odd-even-linked-list",
	"Remove Nth node from the back of the LL": "https://takeuforward.org/data-structure/remove-nth-node-from-the-end-of-the-linked-list",
	"Delete the middle node of LL": "https://takeuforward.org/data-structure/delete-the-middle-node-of-a-linked-list",
	"Sort LL": "https://takeuforward.org/data-structure/sort-linked-list",
	"Sort a LL of 0's 1's and 2's": "https://takeuforward.org/data-structure/sort-linked-list-of-0s-1s-2s",
	"Find intersection point of Y LL": "https://takeuforward.org/data-structure/find-intersection-of-two-linked-lists",
	"Add 1 to a number represented by LL": "https://takeuforward.org/data-structure/add-1-to-a-number-represented-by-linked-list",
	"Add two numbers in LL": "https://takeuforward.org/data-structure/add-two-numbers-represented-as-linked-lists",
	"Add 2 numbers in LL": "https://takeuforward.org/data-structure/add-two-numbers-represented-as-linked-lists",
	"Delete all occurrences of a key in DLL": "https://takeuforward.org/data-structure/delete-all-occurrences-of-a-key-in-doubly-linked-list",
	"Find pairs with given sum in DLL": "https://takeuforward.org/data-structure/find-pairs-with-given-sum-in-doubly-linked-list",
	"Remove duplicates from sorted DLL": "https://takeuforward.org/data-structure/remove-duplicates-from-sorted-doubly-linked-list",
	"Reverse LL in group of given size K": "https://takeuforward.org/data-structure/reverse-linked-list-in-groups-of-size-k",
	"Rotate a LL": "https://takeuforward.org/data-structure/rotate-a-linked-list",
	"Flattening of LL": "https://takeuforward.org/data-structure/flattening-of-linked-list",
	"Clone a Linked List with random and next pointer": "https://takeuforward.org/data-structure/clone-linked-list-with-random-and-next-pointer",
	"Clone a LL with random and next pointer": "https://takeuforward.org/data-structure/clone-linked-list-with-random-and-next-pointer",
	"Merge two sorted linked lists": "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists",
	"Recursive Implementation of atoi()": "https://takeuforward.org/recursion/recursive-implementation-of-atoi",
	"Pow(x, n)": "https://takeuforward.org/recursion/implement-powxn",
	"Count Good numbers": "https://takeuforward.org/recursion/count-good-numbers",
	"Sort a stack using recursion": "https://takeuforward.org/data-structure/sort-a-stack-using-recursion",
	"Reverse a stack using recursion": "https://takeuforward.org/data-structure/reverse-a-stack-using-recursion",
	"Generate all binary strings": "https://takeuforward.org/recursion/generate-all-binary-strings-without-consecutive-1s",
	"Generate Paranthesis": "https://takeuforward.org/data-structure/generate-parentheses",
	"Generate Parenthesis": "https://takeuforward.org/data-structure/generate-parentheses",
	"Print all subsequences/Power Set": "https://takeuforward.org/recursion/print-all-subsequences-power-set",
	"Learn All Patterns of Subsequences": "https://takeuforward.org/recursion/print-all-subsequences-power-set",
	"Count all subsequences with sum K": "https://takeuforward.org/recursion/count-all-subsequences-with-sum-k",
	"Check if there exists a subsequence with sum K": "https://takeuforward.org/recursion/check-if-there-exists-a-subsequence-with-sum-k",
	"Combination Sum - 1": "https://takeuforward.org/data-structure/combination-sum-1",
	"Combination Sum": "https://takeuforward.org/data-structure/combination-sum-1",
	"Combination Sum - 2": "https://takeuforward.org/data-structure/combination-sum-ii",
	"Combination Sum II": "https://takeuforward.org/data-structure/combination-sum-ii",
	"Subset Sum : Sum of all Subsets": "https://takeuforward.org/data-structure/subset-sum-i",
	"Subset Sum I": "https://takeuforward.org/data-structure/subset-sum-i",
	"Subset - II ( Print unique subsets )": "https://takeuforward.org/data-structure/subset-sum-ii",
	"Subset Sum II": "https://takeuforward.org/data-structure/subset-sum-ii",
	"Combination Sum - 3": "https://takeuforward.org/data-structure/combination-sum-iii",
	"Combination Sum III": "https://takeuforward.org/data-structure/combination-sum-iii",
	"Letter Combinations of a Phone Number": "https://takeuforward.org/recursion/letter-combinations-of-a-phone-number",
	"Letter Combinations of a Phone number": "https://takeuforward.org/recursion/letter-combinations-of-a-phone-number",
	"Palindrome Partitioning": "https://takeuforward.org/data-structure/palindrome-partitioning",
	"Word Search": "https://takeuforward.org/data-structure/word-search-leetcode",
	"N Queen": "https://takeuforward.org/data-structure/n-queens",
	"Rat in a Maze": "https://takeuforward.org/data-structure/rat-in-a-maze",
	"Word Break": "https://takeuforward.org/data-structure/word-break",
	"M Coloring Problem": "https://takeuforward.org/graph/m-coloring-problem",
	"Sudoko Solver": "https://takeuforward.org/data-structure/sudoku-solver",
	"Sudoku Solver": "https://takeuforward.org/data-structure/sudoku-solver",
	"Expression Add Operators": "https://takeuforward.org/recursion/expression-add-operators",
	"Introduction to Bit Manipulation": "https://takeuforward.org/data-structure/introduction-to-bit-manipulation",
	"Check if the i-th bit is set or not": "https://takeuforward.org/data-structure/check-if-the-ith-bit-is-set-or-not",
	"Check if a number is odd or not": "https://takeuforward.org/data-structure/check-if-a-number-is-odd-or-not",
	"Check if a number is power of 2 or not": "https://takeuforward.org/data-structure/check-if-a-number-is-power-of-2-or-not",
	"Count the number of set bits": "https://takeuforward.org/data-structure/count-number-of-set-bits",
	"Number of 1 Bits": "https://takeuforward.org/data-structure/count-number-of-set-bits",
	"Set/Unset the rightmost unset bit": "https://takeuforward.org/data-structure/set-unset-rightmost-unset-bit",
	"Swap two numbers": "https://takeuforward.org/data-structure/swap-two-numbers",
	"Divide two integers without using multiplication, division and mod operator": "https://takeuforward.org/data-structure/divide-two-integers",
	"Count number of bits to be flipped to convert A to B": "https://takeuforward.org/data-structure/count-number-of-bits-to-be-flipped",
	"Find the number that appears odd number of times": "https://takeuforward.org/data-structure/find-the-number-appearing-odd-number-of-times",
	"Single Number II": "https://takeuforward.org/data-structure/single-number-ii",
	"Single Number III": "https://takeuforward.org/data-structure/single-number-iii",
	"Power Set": "https://takeuforward.org/data-structure/power-set-using-bit-manipulation",
	"Power Set using bits": "https://takeuforward.org/data-structure/power-set-using-bit-manipulation",
	"Find xor of numbers from L to R": "https://takeuforward.org/data-structure/xor-from-1-to-n",
	"Find the two numbers appearing odd number of times": "https://takeuforward.org/data-structure/find-two-numbers-appearing-odd-number-of-times",
	"Print Prime Factors of a Number": "https://takeuforward.org/data-structure/print-prime-factors-of-a-number",
	"All Divisors of a Number": "https://takeuforward.org/data-structure/print-all-divisors-of-a-number",
	"Sieve of Eratosthenes": "https://takeuforward.org/data-structure/sieve-of-eratosthenes",
	"Find Prime Factorisation of a Number using Sieve": "https://takeuforward.org/data-structure/find-prime-factorisation-of-a-number-using-sieve",
	"Count Primes": "https://takeuforward.org/data-structure/sieve-of-eratosthenes",
	"Power(n, x)": "https://takeuforward.org/recursion/implement-powxn",
	"Reverse Integer": "https://takeuforward.org/data-structure/reverse-digits-of-a-number",
	"Excel Sheet Column Title": "https://takeuforward.org/data-structure/excel-sheet-column-title",
	"Implement Stack using Arrays": "https://takeuforward.org/data-structure/stack-implementation-using-array",
	"Implement Queue using Arrays": "https://takeuforward.org/data-structure/queue-implementation-using-array",
	"Implement Stack using Queue": "https://takeuforward.org/data-structure/implement-stack-using-single-queue",
	"Implement Queue using Stack": "https://takeuforward.org/data-structure/implement-queue-using-stack",
	"Implement stack using Linkedlist": "https://takeuforward.org/data-structure/implement-stack-using-linkedlist",
	"Implement queue using Linkedlist": "https://takeuforward.org/data-structure/implement-queue-using-linkedlist",
	"Check for balanced paranthesis": "https://takeuforward.org/data-structure/check-for-balanced-parentheses",
	"Check for balanced parenthesis": "https://takeuforward.org/data-structure/check-for-balanced-parentheses",
	"Implement Min Stack": "https://takeuforward.org/data-structure/implement-min-stack-o2n-and-on-space-complexity",
	"Infix to Postfix Conversion using Stack": "https://takeuforward.org/data-structure/infix-to-postfix-conversion",
	"Prefix to Infix Conversion": "https://takeuforward.org/data-structure/prefix-to-infix-conversion",
	"Prefix to Postfix Conversion": "https://takeuforward.org/data-structure/prefix-to-postfix-conversion",
	"Postfix to Prefix Conversion": "https://takeuforward.org/data-structure/postfix-to-prefix-conversion",
	"Postfix to Infix": "https://takeuforward.org/data-structure/postfix-to-infix-conversion",
	"Convert Infix To Prefix Notation": "https://takeuforward.org/data-structure/infix-to-prefix-conversion",
	"Next Greater Element": "https://takeuforward.org/data-structure/next-greater-element-using-stack",
	"Next Greater Element 2": "https://takeuforward.org/data-structure/next-greater-element-2",
	"Next Smaller Element": "https://takeuforward.org/data-structure/next-smaller-element",
	"Number of NGEs to the right": "https://takeuforward.org/data-structure/next-greater-element-using-stack",
	"Trapping Rainwater": "https://takeuforward.org/data-structure/trapping-rainwater",
	"Sum of subarray minimum": "https://takeuforward.org/data-structure/sum-of-subarray-minimums",
	"Asteroid Collision": "https://takeuforward.org/data-structure/asteroid-collision",
	"Sum of subarray ranges": "https://takeuforward.org/data-structure/sum-of-subarray-ranges",
	"Remove k Digits": "https://takeuforward.org/data-structure/remove-k-digits",
	"Largest rectangle in a histogram": "https://takeuforward.org/data-structure/largest-rectangle-in-histogram",
	"Maximal Rectangles": "https://takeuforward.org/data-structure/maximal-rectangle",
	"Sliding Window maximum": "https://takeuforward.org/data-structure/sliding-window-maximum",
	"Stock span problem": "https://takeuforward.org/data-structure/stock-span-problem",
	"Online Stock Span": "https://takeuforward.org/data-structure/stock-span-problem",
	"The Celebrity Problem": "https://takeuforward.org/data-structure/the-celebrity-problem",
	"LRU cache (IMPORTANT)": "https://takeuforward.org/data-structure/implement-lru-cache",
	"LFU cache": "https://takeuforward.org/data-structure/design-lfu-cache",
	"Longest Substring Without Repeating Characters": "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character",
	"Max Consecutive Ones III": "https://takeuforward.org/data-structure/max-consecutive-ones-iii",
	"Fruit Into Baskets": "https://takeuforward.org/data-structure/fruit-into-baskets",
	"Longest repeating character replacement": "https://takeuforward.org/data-structure/longest-repeating-character-replacement",
	"Binary subarray with sum": "https://takeuforward.org/data-structure/binary-subarrays-with-sum",
	"Count number of nice subarrays": "https://takeuforward.org/data-structure/count-number-of-nice-subarrays",
	"Number of substrings containing all three characters": "https://takeuforward.org/data-structure/number-of-substrings-containing-all-three-characters",
	"Maximum point you can obtain from cards": "https://takeuforward.org/data-structure/maximum-points-you-can-obtain-from-cards",
	"Longest Substring with At Most K Distinct Characters": "https://takeuforward.org/data-structure/longest-substring-with-at-most-k-distinct-characters",
	"Subarray with k different integers": "https://takeuforward.org/data-structure/subarrays-with-k-different-integers",
	"Minimum Window Substring": "https://takeuforward.org/data-structure/minimum-window-substring",
	"Minimum Window Subsequence": "https://takeuforward.org/data-structure/minimum-window-subsequence",
	"Introduction to Priority Queues using Binary Heaps": "https://takeuforward.org/data-structure/introduction-to-priority-queues-using-binary-heaps",
	"Min Heap and Max Heap Implementation": "https://takeuforward.org/data-structure/min-heap-and-max-heap-implementation",
	"Check if an array represents a min-heap or not": "https://takeuforward.org/data-structure/min-heap-and-max-heap-implementation",
	"Convert min Heap to max Heap": "https://takeuforward.org/data-structure/min-heap-and-max-heap-implementation",
	"Kth largest element in an array": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array",
	"Kth smallest element in an array": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array",
	"Sort K sorted array": "https://takeuforward.org/data-structure/sort-k-sorted-array",
	"Merge M sorted Lists": "https://takeuforward.org/data-structure/merge-k-sorted-lists",
	"Merge K sorted Linked lists": "https://takeuforward.org/data-structure/merge-k-sorted-lists",
	"Replace each array element by its corresponding rank": "https://takeuforward.org/data-structure/replace-each-array-element-by-its-corresponding-rank",
	"Task Scheduler": "https://takeuforward.org/data-structure/task-scheduler",
	"Hands of Straights": "https://takeuforward.org/data-structure/hand-of-straights",
	"Design twitter": "https://takeuforward.org/data-structure/design-twitter",
	"Connect n ropes with minimal cost": "https://takeuforward.org/data-structure/connect-n-ropes-with-minimum-cost",
	"Kth largest element in a stream of running integers": "https://takeuforward.org/data-structure/kth-largest-element-in-a-stream",
	"Maximum Sum Combination": "https://takeuforward.org/data-structure/maximum-sum-combinations",
	"Find Median from Data Stream": "https://takeuforward.org/data-structure/find-median-from-a-data-stream",
	"K most frequent elements": "https://takeuforward.org/data-structure/top-k-frequent-elements",
	"Assign Cookies": "https://takeuforward.org/greedy/assign-cookies",
	"Fractional Knapsack Problem": "https://takeuforward.org/greedy/fractional-knapsack-problem",
	"Greedy algorithm to find minimum number of coins": "https://takeuforward.org/greedy/find-minimum-number-of-coins",
	"Lemonade Change": "https://takeuforward.org/greedy/lemonade-change",
	"Valid Paranthesis Checker": "https://takeuforward.org/greedy/valid-parenthesis-string",
	"Valid Parenthesis Checker": "https://takeuforward.org/greedy/valid-parenthesis-string",
	"N meetings in one room": "https://takeuforward.org/greedy/n-meetings-in-one-room",
	"Jump Game": "https://takeuforward.org/greedy/jump-game",
	"Jump Game 2": "https://takeuforward.org/greedy/jump-game-2",
	"Minimum number of platforms required for a railway": "https://takeuforward.org/greedy/minimum-number-of-platforms-required-for-a-railway-station",
	"Job sequencing Problem": "https://takeuforward.org/greedy/job-sequencing-problem",
	"Candy": "https://takeuforward.org/greedy/candy",
	"Program for Shortest Job First (SJF) CPU Scheduling": "https://takeuforward.org/greedy/shortest-job-first-cpu-scheduling",
	"Insert Interval": "https://takeuforward.org/data-structure/insert-a-given-intervals",
	"Non-overlapping Intervals": "https://takeuforward.org/greedy/non-overlapping-intervals",
	"Introduction to Trees": "https://takeuforward.org/binary-tree/introduction-to-trees",
	"Binary Tree Representation in C++/Java": "https://takeuforward.org/binary-tree/introduction-to-trees",
	"Binary Tree Traversals in Binary Tree": "https://takeuforward.org/binary-tree/binary-tree-traversal",
	"Preorder Traversal of Binary Tree": "https://takeuforward.org/binary-tree/preorder-traversal-of-binary-tree",
	"Inorder Traversal of Binary Tree": "https://takeuforward.org/binary-tree/inorder-traversal-of-binary-tree",
	"Post-order Traversal of Binary Tree": "https://takeuforward.org/binary-tree/post-order-traversal-of-binary-tree",
	"Level order Traversal / Level order traversal in spiral form": "https://takeuforward.org/binary-tree/level-order-traversal-of-a-binary-tree",
	"Iterative Preorder Traversal of Binary Tree": "https://takeuforward.org/binary-tree/iterative-preorder-traversal-of-binary-tree",
	"Iterative Inorder Traversal of Binary Tree": "https://takeuforward.org/binary-tree/iterative-inorder-traversal-of-binary-tree",
	"Post-order Traversal using 2 stacks": "https://takeuforward.org/binary-tree/post-order-traversal-using-2-stacks",
	"Post-order Traversal using 1 stack": "https://takeuforward.org/binary-tree/post-order-traversal-using-1-stack",
	"Preorder, Inorder, and Postorder Traversal in one Traversal": "https://takeuforward.org/binary-tree/preorder-inorder-postorder-traversals-in-one-traversal",
	"Height of a Binary Tree": "https://takeuforward.org/binary-tree/height-of-a-binary-tree",
	"Check if the Binary tree is height-balanced or not": "https://takeuforward.org/binary-tree/check-if-the-binary-tree-is-balanced-or-not",
	"Check if the Binary tree is height-balanced": "https://takeuforward.org/binary-tree/check-if-the-binary-tree-is-balanced-or-not",
	"Diameter of Binary Tree": "https://takeuforward.org/binary-tree/calculate-the-diameter-of-a-binary-tree",
	"Maximum path sum": "https://takeuforward.org/binary-tree/maximum-path-sum",
	"Check if two trees are identical or not": "https://takeuforward.org/binary-tree/check-if-two-trees-are-identical",
	"Check if two trees are identical": "https://takeuforward.org/binary-tree/check-if-two-trees-are-identical",
	"Zig Zag Traversal of Binary Tree": "https://takeuforward.org/binary-tree/zig-zag-traversal-of-binary-tree",
	"Boundary Traversal of Binary Tree": "https://takeuforward.org/binary-tree/boundary-traversal-of-binary-tree",
	"Vertical Order Traversal of Binary Tree": "https://takeuforward.org/binary-tree/vertical-order-traversal-of-binary-tree",
	"Top View of Binary Tree": "https://takeuforward.org/binary-tree/top-view-of-a-binary-tree",
	"Bottom View of Binary Tree": "https://takeuforward.org/binary-tree/bottom-view-of-a-binary-tree",
	"Right/Left view of Binary Tree": "https://takeuforward.org/binary-tree/right-left-view-of-binary-tree",
	"Right/Left View of Binary Tree": "https://takeuforward.org/binary-tree/right-left-view-of-binary-tree",
	"Symmetric Binary Tree": "https://takeuforward.org/binary-tree/check-for-symmetrical-binary-tree",
	"Root to Node Path in Binary Tree": "https://takeuforward.org/binary-tree/print-root-to-node-path-in-a-binary-tree",
	"LCA in Binary Tree": "https://takeuforward.org/binary-tree/lca-in-binary-tree",
	"Maximum width of a Binary Tree": "https://takeuforward.org/binary-tree/maximum-width-of-binary-tree",
	"Check for Children Sum Property": "https://takeuforward.org/binary-tree/check-for-children-sum-property-in-a-binary-tree",
	"Print all the Nodes at a distance of K in a Binary Tree": "https://takeuforward.org/binary-tree/print-all-the-nodes-at-a-distance-of-k-from-a-given-node",
	"Minimum time taken to BURN the Binary Tree from a Node": "https://takeuforward.org/binary-tree/burn-a-tree-starting-from-a-node",
	"Count total Nodes in a COMPLETE Binary Tree": "https://takeuforward.org/binary-tree/count-total-nodes-in-a-complete-binary-tree",
	"Requirements needed to construct a Unique Binary Tree": "https://takeuforward.org/binary-tree/requirements-needed-to-construct-a-unique-binary-tree",
	"Construct Binary Tree from inorder and preorder": "https://takeuforward.org/binary-tree/construct-a-binary-tree-from-inorder-and-preorder-traversal",
	"Construct the Binary Tree from Postorder and Inorder Traversal": "https://takeuforward.org/binary-tree/construct-the-binary-tree-from-postorder-and-inorder-traversal",
	"Serialize and deserialize Binary Tree": "https://takeuforward.org/binary-tree/serialize-and-deserialize-binary-tree",
	"Morris Preorder Traversal of a Binary Tree": "https://takeuforward.org/binary-tree/morris-preorder-traversal-of-a-binary-tree",
	"Morris Inorder Traversal of a Binary Tree": "https://takeuforward.org/binary-tree/morris-inorder-traversal-of-a-binary-tree",
	"Flatten Binary Tree to LinkedList": "https://takeuforward.org/binary-tree/flatten-binary-tree-to-linked-list",
	"Introduction to Binary Search Tree": "https://takeuforward.org/binary-search-tree/introduction-to-binary-search-trees",
	"Search in a Binary Search Tree": "https://takeuforward.org/binary-search-tree/search-in-a-binary-search-tree",
	"Find Min/Max in BST": "https://takeuforward.org/binary-search-tree/find-min-max-in-bst",
	"Ceil in a Binary Search Tree": "https://takeuforward.org/binary-search-tree/ceil-in-a-binary-search-tree",
	"Floor in a Binary Search Tree": "https://takeuforward.org/binary-search-tree/floor-in-a-binary-search-tree",
	"Insert a given Node in Binary Search Tree": "https://takeuforward.org/binary-search-tree/insert-a-given-node-in-binary-search-tree",
	"Delete a Node in Binary Search Tree": "https://takeuforward.org/binary-search-tree/delete-a-node-in-binary-search-tree",
	"Find K-th smallest/largest element in BST": "https://takeuforward.org/binary-search-tree/kth-smallest-largest-element-in-bst",
	"Check if a tree is a BST or BT": "https://takeuforward.org/binary-search-tree/check-if-a-tree-is-a-bst-or-bt",
	"LCA in Binary Search Tree": "https://takeuforward.org/binary-search-tree/lca-in-binary-search-tree",
	"Construct a BST from a preorder traversal": "https://takeuforward.org/binary-search-tree/construct-a-bst-from-a-preorder-traversal",
	"Inorder Successor/Predecessor in BST": "https://takeuforward.org/binary-search-tree/inorder-successor-and-predecessor-in-bst",
	"Merge 2 BST's": "https://takeuforward.org/binary-search-tree/merge-two-bsts",
	"Two Sum In BST | Check if there exists a pair with Sum K": "https://takeuforward.org/binary-search-tree/two-sum-in-bst",
	"Two Sum In BST": "https://takeuforward.org/binary-search-tree/two-sum-in-bst",
	"Recover BST | Correct BST with two nodes swapped": "https://takeuforward.org/binary-search-tree/recover-bst-correct-bst-with-two-nodes-swapped",
	"Largest BST in Binary Tree": "https://takeuforward.org/binary-search-tree/largest-bst-in-binary-tree",
	"Graph and Types": "https://takeuforward.org/graph/graph-and-types",
	"Graph Representation in C++/Java": "https://takeuforward.org/graph/graph-representation-in-c-and-java",
	"Connected Components | Logic Explanation": "https://takeuforward.org/graph/connected-components-logic-explanation",
	"BFS": "https://takeuforward.org/graph/breadth-first-search-bfs-level-order-traversal",
	"BFS of graph": "https://takeuforward.org/graph/breadth-first-search-bfs-level-order-traversal",
	"DFS": "https://takeuforward.org/graph/depth-first-search-dfs",
	"DFS of Graph": "https://takeuforward.org/graph/depth-first-search-dfs",
	"Number of provinces": "https://takeuforward.org/graph/number-of-provinces",
	"Connected Components Problem in Matrix": "https://takeuforward.org/graph/number-of-islands",
	"Number of Islands": "https://takeuforward.org/graph/number-of-islands",
	"Rotten Oranges": "https://takeuforward.org/graph/rotten-oranges",
	"Flood fill": "https://takeuforward.org/graph/flood-fill-algorithm",
	"Cycle Detection in undirected Graph (bfs)": "https://takeuforward.org/graph/detect-cycle-in-an-undirected-graph-using-bfs",
	"Cycle Detection in undirected graph (dfs)": "https://takeuforward.org/graph/detect-cycle-in-an-undirected-graph-using-dfs",
	"0/1 Matrix (Bfs Problem)": "https://takeuforward.org/graph/01-matrix-bfs-problem",
	"Surrounded Regions (dfs)": "https://takeuforward.org/graph/surrounded-regions",
	"Surrounded Regions": "https://takeuforward.org/graph/surrounded-regions",
	"Number of Enclaves [flood fill implementation - multisource]": "https://takeuforward.org/graph/number-of-enclaves",
	"Word ladder - 1": "https://takeuforward.org/graph/word-ladder-i-g-29",
	"Word ladder - 2": "https://takeuforward.org/graph/g-30-word-ladder-ii",
	"Number of Distinct Islands [dfs multisource]": "https://takeuforward.org/graph/number-of-distinct-islands",
	"Number of Distinct Islands": "https://takeuforward.org/graph/number-of-distinct-islands",
	"Bipartite Graph (DFS)": "https://takeuforward.org/graph/bipartite-graph-dfs-implementation",
	"Bipartite Graph": "https://takeuforward.org/graph/bipartite-graph-dfs-implementation",
	"Cycle Detection in Directed Graph (DFS)": "https://takeuforward.org/graph/detect-cycle-in-directed-graph-dfs",
	"Topological Sort Algorithm (DFS)": "https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21",
	"Kahn's Algorithm (BFS Topological Sort)": "https://takeuforward.org/data-structure/kahns-algorithm-topological-sort-algorithm-bfs-g-22",
	"Cycle Detection in Directed Graph (BFS)": "https://takeuforward.org/graph/detect-a-cycle-in-directed-graph-bfs",
	"Course Schedule - I": "https://takeuforward.org/graph/course-schedule-i-and-ii",
	"Course Schedule - II": "https://takeuforward.org/graph/course-schedule-i-and-ii",
	"Find eventual safe states": "https://takeuforward.org/data-structure/find-eventual-safe-states-bfs-topological-sort-g-25",
	"Alien dictionary": "https://takeuforward.org/graph/alien-dictionary-topological-sort",
	"Shortest Path in Directed Acyclic Graph Topological Sort": "https://takeuforward.org/data-structure/shortest-path-in-directed-acyclic-graph-topological-sort-g-27",
	"Shortest Path in Undirected Graph with unit distance": "https://takeuforward.org/graph/shortest-path-in-undirected-graph-with-unit-distance",
	"Dijkstra's Algorithm using Priority Queue": "https://takeuforward.org/graph/dijkstras-algorithm-using-priority-queue",
	"Dijkstra's Algorithm using Set": "https://takeuforward.org/graph/dijkstras-algorithm-using-set",
	"Shortest path in a binary maze": "https://takeuforward.org/graph/shortest-path-in-binary-maze",
	"Path with minimum effort": "https://takeuforward.org/graph/path-with-minimum-effort",
	"Cheapest flights within k stops": "https://takeuforward.org/graph/cheapest-flights-within-k-stops",
	"Number of ways to arrive at destination": "https://takeuforward.org/graph/number-of-ways-to-arrive-at-destination",
	"Minimum steps to reach end from start by performing multiplication and mod operations with array elements": "https://takeuforward.org/graph/shortest-path-in-undirected-graph-with-unit-distance",
	"Bellman Ford Algorithm": "https://takeuforward.org/graph/bellman-ford-algorithm",
	"Floyd Warshall Algorithm": "https://takeuforward.org/graph/floyd-warshall-algorithm",
	"Find the city with the smallest number of neighbors in a threshold distance": "https://takeuforward.org/graph/find-the-city-with-the-smallest-number-of-neighbours-at-a-threshold-distance",
	"Minimum Spanning Tree - Theory": "https://takeuforward.org/graph/minimum-spanning-tree-theory",
	"Prim's Algorithm": "https://takeuforward.org/graph/prims-algorithm-minimum-spanning-tree",
	"Disjoint Set [Union by Rank]": "https://takeuforward.org/graph/disjoint-set-union-by-rank-union-by-size-path-compression",
	"Disjoint Set [Union by Size]": "https://takeuforward.org/graph/disjoint-set-union-by-rank-union-by-size-path-compression",
	"Kruskal's Algorithm": "https://takeuforward.org/graph/kruskals-algorithm-minimum-spanning-tree",
	"Number of operations to make network connected": "https://takeuforward.org/graph/number-of-operations-to-make-network-connected",
	"Most stones removed with same rows or columns": "https://takeuforward.org/graph/most-stones-removed-with-same-row-or-column",
	"Accounts merge": "https://takeuforward.org/graph/accounts-merge",
	"Number of island II": "https://takeuforward.org/graph/number-of-islands-ii",
	"Making a Large Island": "https://takeuforward.org/graph/making-a-large-island",
	"Swim in rising water": "https://takeuforward.org/graph/swim-in-rising-water",
	"Bridges in Graph": "https://takeuforward.org/graph/bridges-in-graph",
	"Critical Connections in a Network": "https://takeuforward.org/graph/bridges-in-graph",
	"Articulation Point in Graph": "https://takeuforward.org/graph/articulation-point-in-graph",
	"Kosaraju's Algorithm": "https://takeuforward.org/graph/strongly-connected-components-korasaraju-algorithm",
	"Strongly Connected Components": "https://takeuforward.org/graph/strongly-connected-components-korasaraju-algorithm",
	"Dynamic Programming Introduction": "https://takeuforward.org/data-structure/introduction-to-dynamic-programming",
	"Fibonacci Number (Memoization & Tabulation)": "https://takeuforward.org/data-structure/dynamic-programming-introduction-and-template",
	"Climbing Stairs": "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs",
	"Climbing Stars": "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs",
	"Frog Jump": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3",
	"Frog Jump with k distances": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4",
	"Maximum sum of non-adjacent elements": "https://takeuforward.org/data-structure/dynamic-programming-maximum-sum-of-non-adjacent-elements",
	"House Robber": "https://takeuforward.org/data-structure/dynamic-programming-house-robber-dp-6",
	"House Robber 2": "https://takeuforward.org/data-structure/dynamic-programming-house-robber-ii",
	"Ninja's Training": "https://takeuforward.org/data-structure/dynamic-programming-ninjas-training-dp-7",
	"Grid Unique Paths": "https://takeuforward.org/data-structure/dynamic-programming-grid-unique-paths-dp-8",
	"Grid Unique Paths 2": "https://takeuforward.org/data-structure/dynamic-programming-grid-unique-paths-2-dp-9",
	"Minimum path sum in Grid": "https://takeuforward.org/data-structure/dynamic-programming-minimum-path-sum-in-grid",
	"Minimum path sum in Triangular Grid": "https://takeuforward.org/data-structure/dynamic-programming-minimum-path-sum-in-triangular-grid",
	"Triangle": "https://takeuforward.org/data-structure/dynamic-programming-minimum-path-sum-in-triangular-grid",
	"Minimum/Maximum Falling Path Sum": "https://takeuforward.org/data-structure/dynamic-programming-minimum-maximum-falling-path-sum",
	"3-D DP: Ninja and his friends": "https://takeuforward.org/data-structure/3-d-dp-ninja-and-his-friends-dp-13",
	"Subset sum equal to target": "https://takeuforward.org/data-structure/dynamic-programming-subset-sum-equal-to-target",
	"Partition Equal Subset Sum": "https://takeuforward.org/data-structure/dynamic-programming-partition-equal-subset-sum",
	"Partition Set Into 2 Subsets With Min Absolute Sum Diff": "https://takeuforward.org/data-structure/dynamic-programming-partition-set-into-2-subsets-with-min-absolute-sum-diff",
	"Count Subsets with Sum K": "https://takeuforward.org/data-structure/dynamic-programming-count-subsets-with-sum-k",
	"Count Partitions with Given Difference": "https://takeuforward.org/data-structure/dynamic-programming-count-partitions-with-given-difference",
	"0/1 Knapsack": "https://takeuforward.org/data-structure/0-1-knapsack-dp-19",
	"Minimum Coins": "https://takeuforward.org/data-structure/dynamic-programming-minimum-coins",
	"Coin Change": "https://takeuforward.org/data-structure/dynamic-programming-minimum-coins",
	"Target Sum": "https://takeuforward.org/data-structure/dynamic-programming-target-sum",
	"Coin Change 2": "https://takeuforward.org/data-structure/dynamic-programming-coin-change-2",
	"Unbounded Knapsack": "https://takeuforward.org/data-structure/dynamic-programming-unbounded-knapsack",
	"Rod Cutting Problem": "https://takeuforward.org/data-structure/dynamic-programming-rod-cutting-problem",
	"Longest Common Subsequence": "https://takeuforward.org/data-structure/dynamic-programming-longest-common-subsequence-dp-25",
	"Print Longest Common Subsequence": "https://takeuforward.org/data-structure/dynamic-programming-print-longest-common-subsequence",
	"Longest Common Substring": "https://takeuforward.org/data-structure/dynamic-programming-longest-common-substring",
	"Longest Palindromic Subsequence": "https://takeuforward.org/data-structure/dynamic-programming-longest-palindromic-subsequence",
	"Minimum insertions to make string palindrome": "https://takeuforward.org/data-structure/dynamic-programming-minimum-insertions-to-make-string-palindrome",
	"Minimum Insertions/Deletions to Convert String": "https://takeuforward.org/data-structure/dynamic-programming-minimum-insertions-deletions-to-convert-string",
	"Shortest Common Supersequence": "https://takeuforward.org/data-structure/dynamic-programming-shortest-common-supersequence",
	"Distinct Subsequences": "https://takeuforward.org/data-structure/dynamic-programming-distinct-subsequences",
	"Edit Distance": "https://takeuforward.org/data-structure/dynamic-programming-edit-distance",
	"Wildcard Matching": "https://takeuforward.org/data-structure/dynamic-programming-wildcard-matching",
	"Best Time to Buy and Sell Stock (DP)": "https://takeuforward.org/data-structure/dynamic-programming-best-time-to-buy-and-sell-stock",
	"best time to buy and sell stock": "https://takeuforward.org/data-structure/dynamic-programming-best-time-to-buy-and-sell-stock",
	"Buy and Sell Stock - II": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stock-ii",
	"Buy and sell stock - II": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stock-ii",
	"Buy and Sell Stocks III": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-iii",
	"Buy and sell stocks III": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-iii",
	"Buy and Sell Stocks IV": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-iv",
	"Buy and stock sell IV": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-iv",
	"Buy and Sell Stocks With Cooldown": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-with-cooldown",
	"Buy and sell stocks with cooldown": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-with-cooldown",
	"Buy and Sell Stocks With Transaction Fee": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-with-transaction-fee",
	"Buy and sell stocks with transaction fee": "https://takeuforward.org/data-structure/dynamic-programming-buy-and-sell-stocks-with-transaction-fee",
	"Longest Increasing Subsequence": "https://takeuforward.org/data-structure/dynamic-programming-longest-increasing-subsequence",
	"Printing Longest Increasing Subsequence": "https://takeuforward.org/data-structure/dynamic-programming-printing-longest-increasing-subsequence",
	"Largest Divisible Subset": "https://takeuforward.org/data-structure/dynamic-programming-largest-divisible-subset",
	"Longest String Chain": "https://takeuforward.org/data-structure/dynamic-programming-longest-string-chain",
	"Longest Bitonic Subsequence": "https://takeuforward.org/data-structure/dynamic-programming-longest-bitonic-subsequence",
	"Number of Longest Increasing Subsequences": "https://takeuforward.org/data-structure/dynamic-programming-number-of-longest-increasing-subsequences",
	"Number of longest increasing subsequences": "https://takeuforward.org/data-structure/dynamic-programming-number-of-longest-increasing-subsequences",
	"Matrix Chain Multiplication": "https://takeuforward.org/data-structure/dynamic-programming-matrix-chain-multiplication",
	"Minimum Cost to Cut the Stick": "https://takeuforward.org/data-structure/dynamic-programming-minimum-cost-to-cut-the-stick",
	"Burst Balloons": "https://takeuforward.org/data-structure/dynamic-programming-burst-balloons",
	"Evaluate Boolean Expression to True": "https://takeuforward.org/data-structure/dynamic-programming-evaluate-boolean-expression-to-true",
	"Palindrome Partitioning - II": "https://takeuforward.org/data-structure/dynamic-programming-palindrome-partitioning-ii",
	"Partition Array for Maximum Sum": "https://takeuforward.org/data-structure/dynamic-programming-partition-array-for-maximum-sum",
	"Maximum Rectangle Area with all 1's": "https://takeuforward.org/data-structure/dynamic-programming-maximum-rectangle-area-with-all-1s",
	"Maximal Rectangle": "https://takeuforward.org/data-structure/dynamic-programming-maximum-rectangle-area-with-all-1s",
	"Count Square Submatrices with All Ones": "https://takeuforward.org/data-structure/dynamic-programming-count-square-submatrices-with-all-ones",
	"Implement TRIE | INSERT | SEARCH | STARTSWITH": "https://takeuforward.org/data-structure/implement-trie-1-insert-search-startswith",
	"Implement Trie - 2 (Prefix Tree)": "https://takeuforward.org/data-structure/implement-trie-2-prefix-tree",
	"Longest String with All Prefixes": "https://takeuforward.org/trie/longest-string-with-all-prefixes",
	"Number of Distinct Substrings in a String": "https://takeuforward.org/data-structure/number-of-distinct-substrings-in-a-string-using-trie",
	"Bit PreRequisites for TRIE Problems": "https://takeuforward.org/data-structure/implement-trie-1-insert-search-startswith",
	"Maximum XOR of two numbers in an array": "https://takeuforward.org/data-structure/maximum-xor-of-two-numbers-in-an-array",
	"Maximum XOR With an Element From Array": "https://takeuforward.org/data-structure/maximum-xor-with-an-element-from-array",
	"Minimum number of bracket reversals needed to make an expression balanced": "https://takeuforward.org/data-structure/minimum-bracket-reversal",
	"Hashing In Strings | Theory": "https://takeuforward.org/data-structure/hashing-in-strings",
	"Rabin Karp": "https://takeuforward.org/data-structure/rabin-karp-algorithm",
	"Z-Function": "https://takeuforward.org/data-structure/z-function",
	"KMP algo / LPS(pi) array": "https://takeuforward.org/data-structure/kmp-algorithm-lps-pi-array",
	"Count palindromic subsequence in given string": "https://takeuforward.org/data-structure/count-palindromic-subsequences"
};
/** Get TUF article URL for a problem name, falling back to site search */
function getTufLink(name) {
	return TUF_LINKS[name] ?? `https://takeuforward.org/?s=${encodeURIComponent(name)}`;
}
//#endregion
//#region src/lib/plan.ts
var START_DATE = "2026-08-01";
var CHECKLIST_TEMPLATE = [
	"Watch video",
	"Read notes",
	"Understand brute force",
	"Derive better approach",
	"Code it",
	"Optimize",
	"Dry run",
	"Submit",
	"Read editorial",
	"Revise yesterday",
	"Push to GitHub",
	"Update notes"
];
var newChecklist = () => CHECKLIST_TEMPLATE.map((label) => ({
	label,
	done: false
}));
function addDays(iso, n) {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + n);
	return d.toISOString().slice(0, 10);
}
function diffDays(a, b) {
	return Math.round(((/* @__PURE__ */ new Date(`${b}T00:00:00Z`)).getTime() - (/* @__PURE__ */ new Date(`${a}T00:00:00Z`)).getTime()) / 864e5);
}
var todayIso = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function formatDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T00:00:00Z`)).toLocaleDateString(void 0, {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
}
var slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
/**
* Upgrade 1: prefer the verified direct problem page. Only fall back to the
* old search URL when we could not confirm a canonical link.
*/
function platformLink(p) {
	if (p.l) return p.l;
	const q = encodeURIComponent(p.n);
	if (p.p === "LeetCode") return `https://leetcode.com/problemset/?search=${q}`;
	if (p.p === "GFG") return `https://www.geeksforgeeks.org/search/?gq=${q}`;
	return `https://www.naukri.com/code360/search?q=${q}`;
}
var estFor = (d) => d === "Easy" ? 15 : d === "Medium" ? 30 : 45;
function toProblem(p) {
	return {
		name: p.n,
		difficulty: p.d,
		platform: p.p,
		link: platformLink(p),
		linkVerified: Boolean(p.l),
		takeUForwardLink: getTufLink(p.n),
		estTime: estFor(p.d),
		done: false,
		isHard: p.d === "Hard"
	};
}
var TOTAL_PROBLEMS = SECTIONS.reduce((a, s) => a + s.problems.length, 0);
/** Distribute the 18 sections across BASE_DAYS days, preserving order. */
function dayAllocation() {
	const counts = SECTIONS.map((s) => s.problems.length);
	const total = counts.reduce((a, b) => a + b, 0);
	const raw = counts.map((c) => c / total * 120);
	const alloc = raw.map((r) => Math.max(1, Math.floor(r)));
	let remaining = 120 - alloc.reduce((a, b) => a + b, 0);
	const order = raw.map((r, i) => ({
		i,
		frac: r - Math.floor(r)
	})).sort((a, b) => b.frac - a.frac);
	let k = 0;
	while (remaining > 0) {
		alloc[order[k % order.length].i] += 1;
		remaining -= 1;
		k += 1;
	}
	while (remaining < 0) {
		const idx = alloc.findIndex((v, i) => v > 1 && counts[i] / v < 3);
		alloc[idx === -1 ? alloc.indexOf(Math.max(...alloc)) : idx] -= 1;
		remaining += 1;
	}
	return alloc;
}
function seedDays(startDate = START_DATE) {
	const alloc = dayAllocation();
	const days = [];
	let dayNumber = 0;
	SECTIONS.forEach((section, si) => {
		const nDays = alloc[si];
		const problems = section.problems;
		const per = Math.ceil(problems.length / nDays);
		for (let i = 0; i < nDays; i++) {
			const chunk = problems.slice(i * per, (i + 1) * per);
			const subCount = Math.max(1, Math.ceil(section.subtopics.length / nDays));
			const subs = section.subtopics.slice(i * subCount, (i + 1) * subCount);
			dayNumber += 1;
			days.push({
				id: `${slug(section.section)}-${i + 1}`,
				dayNumber,
				date: addDays(startDate, dayNumber - 1),
				section: section.section,
				topic: nDays > 1 ? `${section.section} — Part ${i + 1}` : section.section,
				subtopics: subs.length ? subs : section.subtopics.slice(0, 2),
				problems: chunk.map(toProblem),
				checklist: newChecklist(),
				status: "pending",
				notes: "",
				revisionNotes: "",
				skipped: false
			});
		}
	});
	return renumber(days, startDate);
}
/**
* Re-derive dayNumber + date from array order. Sequence is the source of truth.
* `offset` keeps any calendar shift already applied by postpone / pause so a
* later merge or delete does not silently undo it.
*
* Skipped days do NOT consume a slot in the sequence: every active day is
* renumbered 1..N back-to-back, which is what makes "Day 3" become "Day 1"
* once Days 1 and 2 are skipped. Skipped days are parked on a distinct
* negative dayNumber band (-1, -2, ...) instead of keeping their old number —
* leaving their old number in place would eventually collide with an active
* day that gets renumbered into that same slot, which could make actions
* like postpone/merge silently grab the wrong day.
*/
function renumber(days, startDate = START_DATE, offset = 0) {
	let seq = 0;
	let skippedSeq = 0;
	return days.map((d) => {
		if (d.skipped) {
			skippedSeq += 1;
			return {
				...d,
				dayNumber: -skippedSeq
			};
		}
		seq += 1;
		return {
			...d,
			dayNumber: seq,
			date: addDays(startDate, seq - 1 + offset)
		};
	});
}
/**
* Current calendar offset of a plan versus its pure start-date schedule.
*
* Anchors on the first *active* (non-skipped) day rather than literally
* `days[0]`. Skipped days don't get their date refreshed by `renumber` (it's
* irrelevant to them), so if a skipped day happened to sit first in the
* array, its stale date would get read as the offset here and that wrong
* offset would then get baked into every future renumber — which is exactly
* what caused "today" to keep drifting to a later and later date after a
* few skips. Comparing an active day's actual date against its own expected
* date (from its current dayNumber) sidesteps that regardless of position.
*/
var planOffset = (days, startDate = START_DATE) => {
	const anchor = days.find((d) => !d.skipped);
	if (!anchor) return 0;
	return diffDays(addDays(startDate, anchor.dayNumber - 1), anchor.date);
};
var dayProgress = (d) => {
	const total = d.problems.length;
	const done = d.problems.filter((p) => p.done).length;
	return {
		done,
		total,
		pct: total ? Math.round(done / total * 100) : 0
	};
};
function deriveStatus(d) {
	if (d.skipped) return "skipped";
	if (d.status === "postponed" || d.status === "merged" || d.status === "revision") return d.status;
	const { done, total } = dayProgress(d);
	const checks = d.checklist.filter((c) => c.done).length;
	if (total > 0 && done === total) return "completed";
	if (done > 0 || checks > 0) return "in_progress";
	return "pending";
}
var isDayComplete = (d) => d.problems.length > 0 && d.problems.every((p) => p.done);
var STATUS_META = {
	pending: {
		icon: "⏳",
		label: "Pending",
		className: "text-muted-foreground"
	},
	in_progress: {
		icon: "◐",
		label: "In progress",
		className: "text-warning"
	},
	completed: {
		icon: "✅",
		label: "Completed",
		className: "text-success"
	},
	postponed: {
		icon: "⏸",
		label: "Postponed",
		className: "text-warning"
	},
	merged: {
		icon: "🔀",
		label: "Merged",
		className: "text-accent-foreground"
	},
	revision: {
		icon: "🔁",
		label: "Revision",
		className: "text-primary"
	},
	skipped: {
		icon: "⛔",
		label: "Skipped",
		className: "text-muted-foreground"
	}
};
var DEFAULT_DAILY_COUNTS = {
	easy: 4,
	medium: 3,
	hard: 2
};
/**
* Cost of one problem as a fraction of a day. 4 easy/day => each easy costs
* 0.25 of a day; 2 hard/day => each hard costs 0.5. Mixed days therefore stay
* honest: an easy-heavy topic gets more problems, a hard topic gets fewer.
*/
var problemCost = (d, counts) => {
	const per = d === "Easy" ? counts.easy : d === "Medium" ? counts.medium : counts.hard;
	return 1 / Math.max(1, per);
};
/** How many days a bag of problems needs at the given pace. */
var daysNeeded = (problems, counts) => Math.max(1, Math.ceil(problems.reduce((a, p) => a + problemCost(p.difficulty, counts), 0)));
/**
* Redistribute every *not yet completed* problem across freshly-sized days,
* using the per-difficulty pace. Completed days are never touched, so history
* is preserved. Section/topic order is preserved — the sequence stays the
* source of truth and dates are re-derived by `renumber()` afterwards.
*/
function rebalanceRemaining(days, counts, startDate = START_DATE, offset = 0) {
	const firstOpen = days.findIndex((d) => !isDayComplete(d) && d.status !== "merged" && !d.skipped);
	if (firstOpen === -1) return days;
	const keep = days.slice(0, firstOpen);
	const rest = days.slice(firstOpen);
	const skippedRest = rest.filter((d) => d.skipped);
	const activeRest = rest.filter((d) => !d.skipped);
	const pending = [];
	activeRest.forEach((d) => {
		d.problems.forEach((p) => {
			if (!p.done) pending.push({
				problem: p,
				section: d.section,
				subtopics: d.subtopics
			});
		});
	});
	if (pending.length === 0) return days;
	const carriedDone = activeRest.flatMap((d) => d.problems.filter((p) => p.done));
	const rebuilt = [];
	let bucket = [];
	let budget = 0;
	let currentSection = pending[0].section;
	let partIndex = 1;
	const flush = () => {
		if (bucket.length === 0) return;
		const section = bucket[0].section;
		const subs = Array.from(new Set(bucket.flatMap((b) => b.subtopics))).slice(0, 4);
		const sameSection = rebuilt.filter((d) => d.section === section).length;
		rebuilt.push({
			id: `${slug(section)}-r${rebuilt.length + 1}`,
			dayNumber: 0,
			date: startDate,
			section,
			topic: sameSection > 0 ? `${section} — Part ${sameSection + 1}` : section,
			subtopics: subs.length ? subs : [section],
			problems: bucket.map((b) => b.problem),
			checklist: newChecklist(),
			status: "pending",
			notes: "",
			revisionNotes: "",
			skipped: false
		});
		bucket = [];
		budget = 0;
		partIndex += 1;
	};
	pending.forEach((item) => {
		if (item.section !== currentSection) {
			flush();
			currentSection = item.section;
			partIndex = 1;
		}
		bucket.push(item);
		budget += problemCost(item.problem.difficulty, counts);
		if (budget >= 1 - 1e-9) flush();
	});
	flush();
	if (carriedDone.length && rebuilt.length) rebuilt[0] = {
		...rebuilt[0],
		problems: [...carriedDone, ...rebuilt[0].problems]
	};
	return renumber([
		...keep,
		...skippedRest,
		...rebuilt
	], startDate, offset);
}
/**
* Marks the given day(s) — pass a single dayNumber or an array — as skipped
* or active again, then re-derives the sequence with `renumber`.
*
* Deliberately does NOT touch `problems`: a skipped day keeps every one of
* its problems exactly as they were (done or not), it's simply excluded
* from the active 1..N day-number sequence, which is what makes every later
* day shift forward to fill the gap. Un-skipping just puts it back in that
* sequence — since nothing was ever moved off the day, everything reappears
* exactly as it was. (An earlier version cascaded problems onto other days
* when skipping, which meant un-skipping couldn't get them back — that
* cascade has been removed for exactly that reason.)
*
* All requested days are applied together in one pass so day numbers stay
* consistent throughout, whether this is one day (Skip Day / Skip Topic) or
* a whole section's worth (Skip Section).
*/
function setSkipped(days, dayNumbers, skipped, startDate = START_DATE) {
	const set = new Set(Array.isArray(dayNumbers) ? dayNumbers : [dayNumbers]);
	if (set.size === 0) return days;
	return renumber(days.map((d) => set.has(d.dayNumber) ? {
		...d,
		skipped,
		status: skipped ? "skipped" : "pending"
	} : d), startDate);
}
/**
* Same as setSkipped but matches by `day.id` instead of `dayNumber`.
* Used when a day may already have a negative dayNumber (i.e. it is currently
* skipped) and we still need to act on it — matching by the stable `id` field
* avoids the negative-number collision problem.
*/
function setSkippedById(days, ids, skipped, startDate = START_DATE) {
	const idSet = new Set(Array.isArray(ids) ? ids : [ids]);
	if (idSet.size === 0) return days;
	return renumber(days.map((d) => idSet.has(d.id) ? {
		...d,
		skipped,
		status: skipped ? "skipped" : "pending"
	} : d), startDate);
}
/** Shift the calendar (not the sequence) of every day from `fromDayNumber` on. */
var shiftFrom = (days, fromDayNumber, byDays) => days.map((d) => d.dayNumber >= fromDayNumber ? {
	...d,
	date: addDays(d.date, byDays)
} : d);
//#endregion
//#region src/lib/db.ts
var userDoc = (uid) => doc(db, "users", uid);
var daysCol = (uid) => collection(db, "users", uid, "days");
var dayDoc = (uid, dayNumber) => doc(daysCol(uid), String(dayNumber));
var planMetaDoc = (uid) => doc(db, "users", uid, "meta", "plan");
var revisionEventsCol = (uid) => collection(db, "users", uid, "revisionEvents");
/** Cap on stored chat history per day — Firestore documents have a 1MB limit. */
/** Firestore batched writes cap at 500 mutations; stay well under it. */
var BATCH_SIZE = 400;
var dayToFields = (d) => ({
	id: d.id,
	dayNumber: d.dayNumber,
	date: d.date,
	section: d.section,
	topic: d.topic,
	subtopics: d.subtopics,
	problems: d.problems,
	checklist: d.checklist,
	status: d.status,
	notes: d.notes,
	revisionNotes: d.revisionNotes,
	skipped: d.skipped,
	...d.mergeSnapshot !== void 0 && { mergeSnapshot: d.mergeSnapshot },
	updatedAt: serverTimestamp()
});
var fieldsToDay = (data) => ({
	id: data.id ?? "",
	dayNumber: data.dayNumber,
	date: data.date,
	section: data.section ?? "",
	topic: data.topic ?? "",
	subtopics: data.subtopics ?? [],
	problems: (data.problems ?? []).map((p) => ({
		...p,
		takeUForwardLink: getTufLink(p.name)
	})),
	checklist: data.checklist ?? [],
	status: data.status,
	notes: data.notes ?? "",
	revisionNotes: data.revisionNotes ?? "",
	skipped: Boolean(data.skipped),
	mergeSnapshot: data.mergeSnapshot ?? void 0
});
async function deleteAllDays(uid) {
	const refs = (await getDocs(daysCol(uid))).docs.map((d) => d.ref);
	for (let i = 0; i < refs.length; i += BATCH_SIZE) {
		const batch = writeBatch(db);
		refs.slice(i, i + BATCH_SIZE).forEach((ref) => batch.delete(ref));
		await batch.commit();
	}
}
async function writeAllDays(uid, days) {
	for (let i = 0; i < days.length; i += BATCH_SIZE) {
		const batch = writeBatch(db);
		days.slice(i, i + BATCH_SIZE).forEach((d) => batch.set(dayDoc(uid, d.dayNumber), dayToFields(d)));
		await batch.commit();
	}
}
/** Idempotent — equivalent of the old `handle_new_user` Postgres trigger. */
async function ensureProfile(uid) {
	if ((await getDoc(userDoc(uid))).exists()) return;
	const user = auth.currentUser;
	await setDoc(userDoc(uid), {
		email: user?.email ?? "",
		displayName: user?.displayName ?? user?.email?.split("@")[0] ?? "",
		createdAt: serverTimestamp()
	}, { merge: true });
}
/**
* Persists profile fields (display name, etc.) to the Firestore user doc.
* `updateProfile` from firebase/auth only updates the Auth record — without
* this, the name never actually lands in the database.
*/
async function updateUserProfile(uid, patch) {
	await setDoc(userDoc(uid), {
		...patch,
		updatedAt: serverTimestamp()
	}, { merge: true });
}
async function loadPlan(userId) {
	await ensureProfile(userId);
	const metaSnap = await getDoc(planMetaDoc(userId));
	if (!metaSnap.exists()) return seedPlan(userId);
	const daysSnap = await getDocs(query(daysCol(userId), orderBy("dayNumber", "asc")));
	if (daysSnap.empty) return seedPlan(userId);
	const metaData = metaSnap.data();
	return {
		days: daysSnap.docs.map((d) => fieldsToDay(d.data())),
		meta: {
			startDate: metaData.startDate,
			lastActiveDate: metaData.lastActiveDate,
			lastSyncedAt: metaData.lastSyncedAt ?? (/* @__PURE__ */ new Date()).toISOString()
		}
	};
}
async function seedPlan(userId) {
	await ensureProfile(userId);
	const days = seedDays(START_DATE);
	await deleteAllDays(userId);
	await writeAllDays(userId, days);
	const now = /* @__PURE__ */ new Date();
	const today = now.toISOString().slice(0, 10);
	await setDoc(planMetaDoc(userId), {
		schemaVersion: 1,
		startDate: START_DATE,
		lastActiveDate: today,
		lastSyncedAt: now.toISOString()
	});
	return {
		days,
		meta: {
			startDate: START_DATE,
			lastActiveDate: today,
			lastSyncedAt: now.toISOString()
		}
	};
}
async function saveDay(userId, day) {
	await setDoc(dayDoc(userId, day.dayNumber), dayToFields(day));
	await touchSync(userId);
}
/** Rewrites the entire ordered sequence (used by postpone / merge / delete / revision insert). */
async function saveSequence(userId, days) {
	await deleteAllDays(userId);
	await writeAllDays(userId, days);
	await touchSync(userId);
}
async function touchSync(userId) {
	const now = /* @__PURE__ */ new Date();
	await setDoc(planMetaDoc(userId), {
		lastSyncedAt: now.toISOString(),
		lastActiveDate: now.toISOString().slice(0, 10)
	}, { merge: true });
}
async function logEvent(userId, kind, detail) {
	const ref = doc(revisionEventsCol(userId));
	await setDoc(ref, {
		kind,
		detail,
		createdAt: serverTimestamp()
	});
}
async function listEvents(userId) {
	return (await getDocs(query(revisionEventsCol(userId), orderBy("createdAt", "desc")))).docs.slice(0, 25).map((d) => ({
		id: d.id,
		...d.data()
	}));
}
/**
* Client-side best-effort cleanup while the user is still authenticated
* (Security Rules only allow a user to delete their own documents). The
* `deleteUserData` Cloud Function does the authoritative cascade delete of
* every subcollection right before the Auth user itself is removed — see
* functions/src/index.ts and MIGRATION_NOTES.md.
*/
async function deleteAccountData(userId) {
	await deleteAllDays(userId);
	const eventsSnap = await getDocs(revisionEventsCol(userId));
	for (let i = 0; i < eventsSnap.docs.length; i += BATCH_SIZE) {
		const b = writeBatch(db);
		eventsSnap.docs.slice(i, i + BATCH_SIZE).forEach((d) => b.delete(d.ref));
		await b.commit();
	}
	const batch = writeBatch(db);
	batch.delete(planMetaDoc(userId));
	batch.delete(userDoc(userId));
	await batch.commit();
}
var settingsDoc = (uid) => doc(db, "users", uid, "settings", "prefs");
var pushSubscriptionsCol = (uid) => collection(db, "users", uid, "pushSubscriptions");
var problemCompletionsDoc = (uid) => doc(db, "users", uid, "settings", "problemCompletions");
async function loadProblemCompletions(uid) {
	const snap = await getDoc(problemCompletionsDoc(uid));
	if (!snap.exists()) return /* @__PURE__ */ new Set();
	return new Set(snap.data().completed ?? []);
}
async function saveProblemCompletions(uid, completed) {
	await setDoc(problemCompletionsDoc(uid), { completed: [...completed] });
}
//#endregion
export { todayIso as A, newChecklist as C, setSkipped as D, renumber as E, setSkippedById as O, isDayComplete as S, rebalanceRemaining as T, dayProgress as _, logEvent as a, diffDays as b, saveProblemCompletions as c, settingsDoc as d, updateUserProfile as f, addDays as g, TOTAL_PROBLEMS as h, loadProblemCompletions as i, weekNumber as j, shiftFrom as k, saveSequence as l, STATUS_META as m, listEvents as n, pushSubscriptionsCol as o, DEFAULT_DAILY_COUNTS as p, loadPlan as r, saveDay as s, deleteAccountData as t, seedPlan as u, daysNeeded as v, planOffset as w, formatDate as x, deriveStatus as y };
