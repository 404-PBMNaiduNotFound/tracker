import { n as VERIFIED_LINKS, t as SECTIONS } from "./a2z-data-DMDTdYSE.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/lib/extra-problems-data.ts
var EXTRA_PROBLEMS = [
	{
		name: "Two Sum",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/two-sum/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Best Time to Buy and Sell Stock",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Contains Duplicate",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/contains-duplicate/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Product of Array Except Self",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/product-of-array-except-self/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Maximum Subarray",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/maximum-subarray/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Maximum Product Subarray",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/maximum-product-subarray/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Find Minimum in Rotated Sorted Array",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Search in Rotated Sorted Array",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "3Sum",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/3sum/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Container With Most Water",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/container-with-most-water/",
		sheet: "Blind 75",
		topic: "Arrays"
	},
	{
		name: "Sum of Two Integers",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/sum-of-two-integers/",
		sheet: "Blind 75",
		topic: "Bit Manipulation"
	},
	{
		name: "Number of 1 Bits",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/number-of-1-bits/",
		sheet: "Blind 75",
		topic: "Bit Manipulation"
	},
	{
		name: "Counting Bits",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/counting-bits/",
		sheet: "Blind 75",
		topic: "Bit Manipulation"
	},
	{
		name: "Missing Number",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/missing-number/",
		sheet: "Blind 75",
		topic: "Bit Manipulation"
	},
	{
		name: "Reverse Bits",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/reverse-bits/",
		sheet: "Blind 75",
		topic: "Bit Manipulation"
	},
	{
		name: "Climbing Stairs",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/climbing-stairs/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Coin Change",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/coin-change/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Longest Increasing Subsequence",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-increasing-subsequence/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Longest Common Subsequence",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-common-subsequence/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Word Break",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/word-break/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Combination Sum IV",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/combination-sum-iv/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "House Robber",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/house-robber/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "House Robber II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/house-robber-ii/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Decode Ways",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/decode-ways/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Unique Paths",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/unique-paths/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Jump Game",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/jump-game/",
		sheet: "Blind 75",
		topic: "Dynamic Programming"
	},
	{
		name: "Clone Graph",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/clone-graph/",
		sheet: "Blind 75",
		topic: "Graphs"
	},
	{
		name: "Course Schedule",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/course-schedule/",
		sheet: "Blind 75",
		topic: "Graphs"
	},
	{
		name: "Pacific Atlantic Water Flow",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
		sheet: "Blind 75",
		topic: "Graphs"
	},
	{
		name: "Number of Islands",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/number-of-islands/",
		sheet: "Blind 75",
		topic: "Graphs"
	},
	{
		name: "Longest Consecutive Sequence",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-consecutive-sequence/",
		sheet: "Blind 75",
		topic: "Graphs"
	},
	{
		name: "Alien Dictionary",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/alien-dictionary/1",
		sheet: "Blind 75",
		topic: "Graphs"
	},
	{
		name: "Insert Interval",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/insert-interval/",
		sheet: "Blind 75",
		topic: "Intervals"
	},
	{
		name: "Merge Intervals",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/merge-intervals/",
		sheet: "Blind 75",
		topic: "Intervals"
	},
	{
		name: "Non-overlapping Intervals",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/non-overlapping-intervals/",
		sheet: "Blind 75",
		topic: "Intervals"
	},
	{
		name: "Activity Selection (Meeting Rooms)",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1",
		sheet: "Blind 75",
		topic: "Intervals"
	},
	{
		name: "Minimum Platforms (Meeting Rooms II)",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
		sheet: "Blind 75",
		topic: "Intervals"
	},
	{
		name: "Reverse a Linked List",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/reverse-linked-list/",
		sheet: "Blind 75",
		topic: "Linked List"
	},
	{
		name: "Detect Cycle in Linked List",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/linked-list-cycle/",
		sheet: "Blind 75",
		topic: "Linked List"
	},
	{
		name: "Merge Two Sorted Lists",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/merge-two-sorted-lists/",
		sheet: "Blind 75",
		topic: "Linked List"
	},
	{
		name: "Merge K Sorted Lists",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/merge-k-sorted-lists/",
		sheet: "Blind 75",
		topic: "Linked List"
	},
	{
		name: "Remove Nth Node From End of List",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
		sheet: "Blind 75",
		topic: "Linked List"
	},
	{
		name: "Reorder List",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/reorder-list/",
		sheet: "Blind 75",
		topic: "Linked List"
	},
	{
		name: "Set Matrix Zeroes",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/set-matrix-zeroes/",
		sheet: "Blind 75",
		topic: "Matrix"
	},
	{
		name: "Spiral Matrix",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/spiral-matrix/",
		sheet: "Blind 75",
		topic: "Matrix"
	},
	{
		name: "Rotate Image",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/rotate-image/",
		sheet: "Blind 75",
		topic: "Matrix"
	},
	{
		name: "Word Search",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/word-search/",
		sheet: "Blind 75",
		topic: "Matrix"
	},
	{
		name: "Longest Substring Without Repeating Characters",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Longest Repeating Character Replacement",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-repeating-character-replacement/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Minimum Window Substring",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/minimum-window-substring/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Valid Anagram",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/valid-anagram/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Group Anagrams",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/group-anagrams/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Valid Parentheses",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/valid-parentheses/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Valid Palindrome",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/valid-palindrome/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Longest Palindromic Substring",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-palindromic-substring/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Palindromic Substrings",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/palindromic-substrings/",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Encode and Decode Strings",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1",
		sheet: "Blind 75",
		topic: "Strings"
	},
	{
		name: "Maximum Depth of Binary Tree",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Same Tree",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/same-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Invert Binary Tree",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/invert-binary-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Binary Tree Maximum Path Sum",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Binary Tree Level Order Traversal",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Serialize and Deserialize Binary Tree",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Subtree of Another Tree",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/subtree-of-another-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Construct Binary Tree from Preorder and Inorder Traversal",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Validate Binary Search Tree",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/validate-binary-search-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Kth Smallest Element in a BST",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Lowest Common Ancestor of a BST",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
		sheet: "Blind 75",
		topic: "Trees"
	},
	{
		name: "Implement Trie (Prefix Tree)",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
		sheet: "Blind 75",
		topic: "Trie"
	},
	{
		name: "Add and Search Word",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
		sheet: "Blind 75",
		topic: "Trie"
	},
	{
		name: "Word Search II",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/word-search-ii/",
		sheet: "Blind 75",
		topic: "Trie"
	},
	{
		name: "Top K Frequent Elements",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/top-k-frequent-elements/",
		sheet: "Blind 75",
		topic: "Heap"
	},
	{
		name: "Find Median from Data Stream",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/find-median-from-data-stream/",
		sheet: "Blind 75",
		topic: "Heap"
	},
	{
		name: "Valid Sudoku",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/valid-sudoku/",
		sheet: "NeetCode 150",
		topic: "Arrays & Hashing"
	},
	{
		name: "Sort Colors",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/sort-colors/",
		sheet: "NeetCode 150",
		topic: "Arrays & Hashing"
	},
	{
		name: "Two Sum II - Input Array Is Sorted",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
		sheet: "NeetCode 150",
		topic: "Two Pointers"
	},
	{
		name: "Trapping Rain Water",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/trapping-rain-water/",
		sheet: "NeetCode 150",
		topic: "Two Pointers"
	},
	{
		name: "Valid Palindrome II",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/valid-palindrome-ii/",
		sheet: "NeetCode 150",
		topic: "Two Pointers"
	},
	{
		name: "Best Time to Buy and Sell Stock II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Jump Game II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/jump-game-ii/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Gas Station",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/gas-station/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Hand of Straights",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/hand-of-straights/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Merge Triplets to Form Target Triplet",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Partition Labels",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/partition-labels/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Valid Parenthesis String",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/valid-parenthesis-string/",
		sheet: "NeetCode 150",
		topic: "Greedy"
	},
	{
		name: "Sliding Window Maximum",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/sliding-window-maximum/",
		sheet: "NeetCode 150",
		topic: "Sliding Window"
	},
	{
		name: "Permutation in String",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/permutation-in-string/",
		sheet: "NeetCode 150",
		topic: "Sliding Window"
	},
	{
		name: "Fruit Into Baskets",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/fruit-into-baskets/",
		sheet: "NeetCode 150",
		topic: "Sliding Window"
	},
	{
		name: "Minimum Size Subarray Sum",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/minimum-size-subarray-sum/",
		sheet: "NeetCode 150",
		topic: "Sliding Window"
	},
	{
		name: "Evaluate Reverse Polish Notation",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
		sheet: "NeetCode 150",
		topic: "Stack"
	},
	{
		name: "Generate Parentheses",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/generate-parentheses/",
		sheet: "NeetCode 150",
		topic: "Stack"
	},
	{
		name: "Daily Temperatures",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/daily-temperatures/",
		sheet: "NeetCode 150",
		topic: "Stack"
	},
	{
		name: "Car Fleet",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/car-fleet/",
		sheet: "NeetCode 150",
		topic: "Stack"
	},
	{
		name: "Largest Rectangle in Histogram",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
		sheet: "NeetCode 150",
		topic: "Stack"
	},
	{
		name: "Min Stack",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/min-stack/",
		sheet: "NeetCode 150",
		topic: "Stack"
	},
	{
		name: "Binary Search",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/binary-search/",
		sheet: "NeetCode 150",
		topic: "Binary Search"
	},
	{
		name: "Guess Number Higher or Lower",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/guess-number-higher-or-lower/",
		sheet: "NeetCode 150",
		topic: "Binary Search"
	},
	{
		name: "Koko Eating Bananas",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/koko-eating-bananas/",
		sheet: "NeetCode 150",
		topic: "Binary Search"
	},
	{
		name: "Median of Two Sorted Arrays",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
		sheet: "NeetCode 150",
		topic: "Binary Search"
	},
	{
		name: "Time Based Key-Value Store",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/time-based-key-value-store/",
		sheet: "NeetCode 150",
		topic: "Binary Search"
	},
	{
		name: "Reverse Linked List II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/reverse-linked-list-ii/",
		sheet: "NeetCode 150",
		topic: "Linked List"
	},
	{
		name: "Copy List with Random Pointer",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
		sheet: "NeetCode 150",
		topic: "Linked List"
	},
	{
		name: "Add Two Numbers",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/add-two-numbers/",
		sheet: "NeetCode 150",
		topic: "Linked List"
	},
	{
		name: "Find the Duplicate Number",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/find-the-duplicate-number/",
		sheet: "NeetCode 150",
		topic: "Linked List"
	},
	{
		name: "LRU Cache",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/lru-cache/",
		sheet: "NeetCode 150",
		topic: "Linked List"
	},
	{
		name: "Rotate List",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/rotate-list/",
		sheet: "NeetCode 150",
		topic: "Linked List"
	},
	{
		name: "Diameter of Binary Tree",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/diameter-of-binary-tree/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Balanced Binary Tree",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/balanced-binary-tree/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Path Sum",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/path-sum/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Count Good Nodes in Binary Tree",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Binary Tree Right Side View",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/binary-tree-right-side-view/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Flatten Binary Tree to Linked List",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Insert into a Binary Search Tree",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Delete Node in a BST",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/delete-node-in-a-bst/",
		sheet: "NeetCode 150",
		topic: "Trees"
	},
	{
		name: "Max Area of Island",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/max-area-of-island/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Rotting Oranges",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/rotting-oranges/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Course Schedule II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/course-schedule-ii/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Surrounded Regions",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/surrounded-regions/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Redundant Connection",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/redundant-connection/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Word Ladder",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/word-ladder/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Network Delay Time",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/network-delay-time/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Swim in Rising Water",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/swim-in-rising-water/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Cheapest Flights Within K Stops",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
		sheet: "NeetCode 150",
		topic: "Graphs"
	},
	{
		name: "Kth Largest Element in a Stream",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
		sheet: "NeetCode 150",
		topic: "Heap / Priority Queue"
	},
	{
		name: "Last Stone Weight",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/last-stone-weight/",
		sheet: "NeetCode 150",
		topic: "Heap / Priority Queue"
	},
	{
		name: "K Closest Points to Origin",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/k-closest-points-to-origin/",
		sheet: "NeetCode 150",
		topic: "Heap / Priority Queue"
	},
	{
		name: "Kth Largest Element in an Array",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
		sheet: "NeetCode 150",
		topic: "Heap / Priority Queue"
	},
	{
		name: "Task Scheduler",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/task-scheduler/",
		sheet: "NeetCode 150",
		topic: "Heap / Priority Queue"
	},
	{
		name: "Design Twitter",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/design-twitter/",
		sheet: "NeetCode 150",
		topic: "Heap / Priority Queue"
	},
	{
		name: "Subsets",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/subsets/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Combination Sum",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/combination-sum/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Combination Sum II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/combination-sum-ii/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Permutations",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/permutations/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Subsets II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/subsets-ii/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Letter Combinations of a Phone Number",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "N-Queens",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/n-queens/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Palindrome Partitioning",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/palindrome-partitioning/",
		sheet: "NeetCode 150",
		topic: "Backtracking"
	},
	{
		name: "Min Cost Climbing Stairs",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/min-cost-climbing-stairs/",
		sheet: "NeetCode 150",
		topic: "1D Dynamic Programming"
	},
	{
		name: "Partition Equal Subset Sum",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/partition-equal-subset-sum/",
		sheet: "NeetCode 150",
		topic: "2D Dynamic Programming"
	},
	{
		name: "Target Sum",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/target-sum/",
		sheet: "NeetCode 150",
		topic: "2D Dynamic Programming"
	},
	{
		name: "Edit Distance",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/edit-distance/",
		sheet: "NeetCode 150",
		topic: "2D Dynamic Programming"
	},
	{
		name: "Distinct Subsequences",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/distinct-subsequences/",
		sheet: "NeetCode 150",
		topic: "2D Dynamic Programming"
	},
	{
		name: "Burst Balloons",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/burst-balloons/",
		sheet: "NeetCode 150",
		topic: "2D Dynamic Programming"
	},
	{
		name: "Regular Expression Matching",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/regular-expression-matching/",
		sheet: "NeetCode 150",
		topic: "2D Dynamic Programming"
	},
	{
		name: "Single Number",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/single-number/",
		sheet: "NeetCode 150",
		topic: "Bit Manipulation"
	},
	{
		name: "Reverse Integer",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/reverse-integer/",
		sheet: "NeetCode 150",
		topic: "Math"
	},
	{
		name: "Merge Sorted Array",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/merge-sorted-array/",
		sheet: "Top Interview 150",
		topic: "Arrays"
	},
	{
		name: "Remove Element",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/remove-element/",
		sheet: "Top Interview 150",
		topic: "Arrays"
	},
	{
		name: "Remove Duplicates from Sorted Array II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
		sheet: "Top Interview 150",
		topic: "Arrays"
	},
	{
		name: "Majority Element",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/majority-element/",
		sheet: "Top Interview 150",
		topic: "Arrays"
	},
	{
		name: "Candy",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/candy/",
		sheet: "Top Interview 150",
		topic: "Arrays"
	},
	{
		name: "H-Index",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/h-index/",
		sheet: "Top Interview 150",
		topic: "Arrays"
	},
	{
		name: "Roman to Integer",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/roman-to-integer/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Integer to Roman",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/integer-to-roman/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Length of Last Word",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/length-of-last-word/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Longest Common Prefix",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/longest-common-prefix/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Reverse Words in a String",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/reverse-words-in-a-string/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Zigzag Conversion",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/zigzag-conversion/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Find the Index of the First Occurrence in a String",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Text Justification",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/text-justification/",
		sheet: "Top Interview 150",
		topic: "Strings"
	},
	{
		name: "Is Subsequence",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/is-subsequence/",
		sheet: "Top Interview 150",
		topic: "Two Pointers"
	},
	{
		name: "Move Zeroes",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/move-zeroes/",
		sheet: "Top Interview 150",
		topic: "Two Pointers"
	},
	{
		name: "Happy Number",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/happy-number/",
		sheet: "Top Interview 150",
		topic: "Math"
	},
	{
		name: "Plus One",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/plus-one/",
		sheet: "Top Interview 150",
		topic: "Math"
	},
	{
		name: "Sqrt(x)",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/sqrtx/",
		sheet: "Top Interview 150",
		topic: "Math"
	},
	{
		name: "Pow(x, n)",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/powx-n/",
		sheet: "Top Interview 150",
		topic: "Math"
	},
	{
		name: "Max Points on a Line",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/max-points-on-a-line/",
		sheet: "Top Interview 150",
		topic: "Math"
	},
	{
		name: "Snakes and Ladders",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/snakes-and-ladders/",
		sheet: "Top Interview 150",
		topic: "BFS / DFS"
	},
	{
		name: "Minimum Genetic Mutation",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/minimum-genetic-mutation/",
		sheet: "Top Interview 150",
		topic: "BFS / DFS"
	},
	{
		name: "LFU Cache",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/lfu-cache/",
		sheet: "Top Interview 150",
		topic: "Design"
	},
	{
		name: "Insert Delete GetRandom O(1)",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
		sheet: "Top Interview 150",
		topic: "Design"
	},
	{
		name: "Maximum Sum Circular Subarray",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
		sheet: "Top Interview 150",
		topic: "Kadane's Algorithm"
	},
	{
		name: "Triangle",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/triangle/",
		sheet: "Top Interview 150",
		topic: "DP: Multidimensional"
	},
	{
		name: "Minimum Path Sum",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/minimum-path-sum/",
		sheet: "Top Interview 150",
		topic: "DP: Multidimensional"
	},
	{
		name: "Unique Paths II",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/unique-paths-ii/",
		sheet: "Top Interview 150",
		topic: "DP: Multidimensional"
	},
	{
		name: "Maximal Square",
		difficulty: "Medium",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/maximal-square/",
		sheet: "Top Interview 150",
		topic: "DP: Multidimensional"
	},
	{
		name: "Interleaving String",
		difficulty: "Hard",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/interleaving-string/",
		sheet: "Top Interview 150",
		topic: "DP: Multidimensional"
	},
	{
		name: "Reverse an Array",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/reverse-an-array/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Find Maximum and Minimum in Array",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Kth Smallest Element",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Find Duplicates in Array",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/find-duplicates-in-an-array/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Merge Without Extra Space",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Chocolate Distribution Problem",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Smallest Subarray with Sum Greater than X",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5651/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Three Way Partitioning of Array",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/three-way-partitioning/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Minimum Swaps to Sort",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/minimum-swaps-to-sort/1",
		sheet: "Love Babbar 450",
		topic: "Arrays"
	},
	{
		name: "Transpose of a Matrix",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/transpose-of-matrix-1587115621/1",
		sheet: "Love Babbar 450",
		topic: "Matrix"
	},
	{
		name: "Rotate a Matrix",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1",
		sheet: "Love Babbar 450",
		topic: "Matrix"
	},
	{
		name: "Boolean Matrix Problem",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/boolean-matrix-problem-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Matrix"
	},
	{
		name: "Max Rectangle in Binary Matrix",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/max-rectangle/1",
		sheet: "Love Babbar 450",
		topic: "Matrix"
	},
	{
		name: "Find Median in Row Wise Sorted Matrix",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1",
		sheet: "Love Babbar 450",
		topic: "Matrix"
	},
	{
		name: "Check if String is Rotation of Another",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/check-if-string-is-rotated-by-two-places-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "Roman Number to Integer",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/roman-number-to-integer3201/1",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "Anagram",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/anagram-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "Count and Say",
		difficulty: "Easy",
		platform: "LeetCode",
		link: "https://leetcode.com/problems/count-and-say/",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "Implement strstr",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implement-strstr/1",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "Minimum Characters to Make a String Palindrome",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/minimum-characters-to-be-added-at-front-to-make-string-palindrome/1",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "KMP Algorithm",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/search-pattern-kmp-algorithm/1",
		sheet: "Love Babbar 450",
		topic: "Strings"
	},
	{
		name: "Finding Middle Element in a Linked List",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Nth Node from End of Linked List",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Delete a Node in Single Linked List",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/delete-a-node-in-single-linked-list/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Reverse a Linked List in Groups of K",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Check if Linked List is Palindrome",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/check-if-linked-list-is-palindrome/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Flatten a Linked List",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Merge Sort on Linked List",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/sort-a-linked-list/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Pairwise Swap of Nodes",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/pairwise-swap-elements-of-a-linked-list-by-swapping-data/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Clone a Linked List with Random Pointer",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1",
		sheet: "Love Babbar 450",
		topic: "Linked List"
	},
	{
		name: "Implement Stack using Arrays",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Implement Stack using Linked List",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Implement Queue using Stack",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Implement Stack using Queue",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Next Larger Element",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Next Smaller of Next Greater",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/next-smaller-element1507/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Delete Middle Element of Stack",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Check for Balanced Parenthesis",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "First Non-Repeating Character in a Stream",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Stock Span Problem",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Maximum of All Subarrays of Size K",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1",
		sheet: "Love Babbar 450",
		topic: "Stack & Queue"
	},
	{
		name: "Height of Binary Tree",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/height-of-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Left View of Binary Tree",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Bottom View of Binary Tree",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Top View of Binary Tree",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Vertical Order Traversal of Binary Tree",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/print-a-binary-tree-in-vertical-order/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Diagonal Traversal of Binary Tree",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/diagonal-traversal-of-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Boundary Traversal of Binary Tree",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Convert Binary Tree to Doubly Linked List",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/binary-tree-to-dll/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Convert Binary Tree to Sum Tree",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/transform-to-sum-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Lowest Common Ancestor in a Binary Tree",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Find Largest Value in Each Level",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/largest-value-in-each-level/1",
		sheet: "Love Babbar 450",
		topic: "Trees"
	},
	{
		name: "Search in BST",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/search-a-node-in-bst/1",
		sheet: "Love Babbar 450",
		topic: "BST"
	},
	{
		name: "Delete a Node from BST",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/delete-a-node-from-bst/1",
		sheet: "Love Babbar 450",
		topic: "BST"
	},
	{
		name: "Floor in BST",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/floor-in-bst/1",
		sheet: "Love Babbar 450",
		topic: "BST"
	},
	{
		name: "Ceil in BST",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1",
		sheet: "Love Babbar 450",
		topic: "BST"
	},
	{
		name: "Kth Largest Element in BST",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/kth-largest-element-in-bst/1",
		sheet: "Love Babbar 450",
		topic: "BST"
	},
	{
		name: "Count BST Nodes that Lie in a Given Range",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/count-bst-nodes-that-lie-in-a-given-range/1",
		sheet: "Love Babbar 450",
		topic: "BST"
	},
	{
		name: "Job Sequencing Problem",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Greedy"
	},
	{
		name: "Huffman Coding",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/huffman-encoding3345/1",
		sheet: "Love Babbar 450",
		topic: "Greedy"
	},
	{
		name: "Fractional Knapsack",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Greedy"
	},
	{
		name: "Rat in a Maze",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
		sheet: "Love Babbar 450",
		topic: "Backtracking"
	},
	{
		name: "Solve the Sudoku",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1",
		sheet: "Love Babbar 450",
		topic: "Backtracking"
	},
	{
		name: "M Coloring Problem",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Backtracking"
	},
	{
		name: "0-1 Knapsack Problem",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Egg Dropping Puzzle",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/egg-dropping-puzzle-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Subset Sum Problem",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Count Number of Ways to Cover a Distance",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/count-number-of-hops-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Painting Fence Algorithm",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/painting-fence-algorithm/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Matrix Chain Multiplication",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Longest Bitonic Subsequence",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Smallest Sum Contiguous Subarray",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/smallest-sum-contiguous-subarray/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "Wildcard Pattern Matching",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/wildcard-pattern-matching/1",
		sheet: "Love Babbar 450",
		topic: "Dynamic Programming"
	},
	{
		name: "BFS of Graph",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "DFS of Graph",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Detect Cycle in Undirected Graph",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Detect Cycle in Directed Graph",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Topological Sort",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/topological-sort/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Find the Number of Islands",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Implementing Dijkstra",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Minimum Spanning Tree (Prim's)",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Bellman Ford Algorithm",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Floyd Warshall Algorithm",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Bridges in a Graph",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/bridge-edge-in-graph/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Strongly Connected Components (Kosaraju)",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1",
		sheet: "Love Babbar 450",
		topic: "Graphs"
	},
	{
		name: "Heap Sort",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/heap-sort/1",
		sheet: "Love Babbar 450",
		topic: "Heap"
	},
	{
		name: "K-th Largest Sum Contiguous Subarray",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/k-th-largest-sum-contiguous-subarray/1",
		sheet: "Love Babbar 450",
		topic: "Heap"
	},
	{
		name: "Merge K Sorted Arrays",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1",
		sheet: "Love Babbar 450",
		topic: "Heap"
	},
	{
		name: "Find Median in a Stream",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1",
		sheet: "Love Babbar 450",
		topic: "Heap"
	},
	{
		name: "Trie (Insert and Search)",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1",
		sheet: "Love Babbar 450",
		topic: "Trie"
	},
	{
		name: "Trie Delete",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/trie-delete/1",
		sheet: "Love Babbar 450",
		topic: "Trie"
	},
	{
		name: "Unique Rows in Boolean Matrix",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/unique-rows-in-boolean-matrix/1",
		sheet: "Love Babbar 450",
		topic: "Trie"
	},
	{
		name: "Count Distinct Rows in a Binary Matrix",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/count-distinct-rows-in-a-binary-matrix/1",
		sheet: "Love Babbar 450",
		topic: "Trie"
	},
	{
		name: "Equilibrium Point",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/equilibrium-point-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Arrays"
	},
	{
		name: "Kadane's Algorithm",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Arrays"
	},
	{
		name: "Count Pairs with Given Sum",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1",
		sheet: "GFG Must-Do",
		topic: "Arrays"
	},
	{
		name: "Number of Pairs",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/number-of-pairs-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Arrays"
	},
	{
		name: "Inversion of Array",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Arrays"
	},
	{
		name: "Sort by Set Bit Count",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/sort-by-set-bit-count1153/1",
		sheet: "GFG Must-Do",
		topic: "Arrays"
	},
	{
		name: "Spirally Traversing a Matrix",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1",
		sheet: "GFG Must-Do",
		topic: "Matrix"
	},
	{
		name: "Longest Palindrome in a String",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1",
		sheet: "GFG Must-Do",
		topic: "Strings"
	},
	{
		name: "Rabin-Karp Algorithm",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/search-pattern-rabin-karp-algorithm/1",
		sheet: "GFG Must-Do",
		topic: "Strings"
	},
	{
		name: "Detect Loop in Linked List",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1",
		sheet: "GFG Must-Do",
		topic: "Linked List"
	},
	{
		name: "Remove Loop in Linked List",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1",
		sheet: "GFG Must-Do",
		topic: "Linked List"
	},
	{
		name: "Get Min from Stack",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1",
		sheet: "GFG Must-Do",
		topic: "Stack & Queue"
	},
	{
		name: "Implement Two Stacks in an Array",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1",
		sheet: "GFG Must-Do",
		topic: "Stack & Queue"
	},
	{
		name: "Level Order Traversal",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/level-order-traversal/1",
		sheet: "GFG Must-Do",
		topic: "Trees"
	},
	{
		name: "Mirror Tree",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/mirror-tree/1",
		sheet: "GFG Must-Do",
		topic: "Trees"
	},
	{
		name: "Sum Tree",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/sum-tree/1",
		sheet: "GFG Must-Do",
		topic: "Trees"
	},
	{
		name: "Print all nodes at distance K in a Binary Tree",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/nodes-at-given-distance-in-binary-tree/1",
		sheet: "GFG Must-Do",
		topic: "Trees"
	},
	{
		name: "Burning Tree",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/burning-tree/1",
		sheet: "GFG Must-Do",
		topic: "Trees"
	},
	{
		name: "Shortest Path in Weighted Undirected Graph",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1",
		sheet: "GFG Must-Do",
		topic: "Graphs"
	},
	{
		name: "Articulation Points",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/articulation-point-1/1",
		sheet: "GFG Must-Do",
		topic: "Graphs"
	},
	{
		name: "Fibonacci Number with DP",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/nth-fibonacci-number1335/1",
		sheet: "GFG Must-Do",
		topic: "Dynamic Programming"
	},
	{
		name: "Minimum Number of Jumps",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Dynamic Programming"
	},
	{
		name: "Staircase Problem",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Dynamic Programming"
	},
	{
		name: "Longest Palindromic Subsequence",
		difficulty: "Medium",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/longest-palindromic-subsequence-1612327878/1",
		sheet: "GFG Must-Do",
		topic: "Dynamic Programming"
	},
	{
		name: "Shortest Common Supersequence",
		difficulty: "Hard",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/shortest-common-supersequence0322/1",
		sheet: "GFG Must-Do",
		topic: "Dynamic Programming"
	},
	{
		name: "Power of 2",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/power-of-2-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Bit Manipulation"
	},
	{
		name: "Bit Difference",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/bit-difference-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Bit Manipulation"
	},
	{
		name: "Find Position of Set Bit",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/find-position-of-set-bit3706/1",
		sheet: "GFG Must-Do",
		topic: "Bit Manipulation"
	},
	{
		name: "Check whether K-th bit is set or not",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1",
		sheet: "GFG Must-Do",
		topic: "Bit Manipulation"
	},
	{
		name: "Toggle bits given range",
		difficulty: "Easy",
		platform: "GFG",
		link: "https://www.geeksforgeeks.org/problems/toggle-bits-given-range0952/1",
		sheet: "GFG Must-Do",
		topic: "Bit Manipulation"
	}
];
//#endregion
//#region src/routes/_authenticated/problems.tsx
var $$splitComponentImporter = () => import("./problems-CfCZwsTI.js");
var Route = createFileRoute("/_authenticated/problems")({
	head: () => ({ meta: [
		{ title: "Problems — DSA Tracker" },
		{
			name: "description",
			content: "Browse problems from Striver A2Z, NeetCode 150, Blind 75, Love Babbar 450, Top Interview 150 and GFG Must-Do."
		},
		{
			property: "og:title",
			content: "Problems — DSA Tracker"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function canonicalPlatform(raw) {
	const r = raw.toLowerCase();
	if (r.includes("leetcode")) return "LeetCode";
	if (r.includes("gfg") || r.includes("geeks")) return "GFG";
	if (r.includes("hacker")) return "HackerRank";
	if (r.includes("code") && r.includes("studio")) return "CodeStudio";
	return "LeetCode";
}
function buildAllProblems() {
	const a2z = SECTIONS.flatMap((sec) => sec.problems.filter((p) => VERIFIED_LINKS[p.n] !== void 0 || p.l !== void 0).map((p) => {
		const plat = canonicalPlatform(p.p);
		const link = p.l ?? VERIFIED_LINKS[p.n];
		return {
			name: p.n,
			difficulty: p.d,
			platform: plat,
			topic: sec.section,
			sheet: "Striver A2Z",
			link
		};
	}));
	const extra = EXTRA_PROBLEMS.map((p) => ({
		name: p.name,
		difficulty: p.difficulty,
		platform: p.platform,
		topic: p.topic,
		sheet: p.sheet,
		link: p.link
	}));
	const seen = /* @__PURE__ */ new Set();
	return [...a2z, ...extra].filter((p) => {
		const key = `${p.name.toLowerCase()}|${p.link}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
var ALL_PROBLEMS = buildAllProblems();
//#endregion
export { Route as n, ALL_PROBLEMS as t };
