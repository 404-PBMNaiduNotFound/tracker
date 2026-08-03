//#region src/lib/verified-links.ts
/**
* NEW FILE (Upgrade 1)
*
* Curated, hand-verified canonical problem URLs, keyed by the exact `n` (name)
* used in `a2z-data.ts`.
*
* RULE: only add an entry here when the canonical URL is known with certainty.
* Anything missing from this map keeps the existing search-URL fallback in
* `platformLink()` and is flagged `linkVerified: false` so the UI can say so
* instead of pretending an unverified link is the real problem page.
*/
var VERIFIED_LINKS = {
	"Largest Element in an Array": "https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1",
	"Check if the array is sorted": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
	"Remove duplicates from Sorted array": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
	"Left Rotate an array by one place": "https://www.geeksforgeeks.org/problems/cyclically-rotate-an-array-by-one2614/1",
	"Left rotate an array by D places": "https://leetcode.com/problems/rotate-array/",
	"Move Zeros to end": "https://leetcode.com/problems/move-zeroes/",
	"Linear Search": "https://www.geeksforgeeks.org/problems/searching-a-number0324/1",
	"Find missing number in an array": "https://leetcode.com/problems/missing-number/",
	"Maximum Consecutive Ones": "https://leetcode.com/problems/max-consecutive-ones/",
	"Find the number that appears once, and other numbers twice": "https://leetcode.com/problems/single-number/",
	"Longest subarray with given sum K(positives)": "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1",
	"Longest subarray with sum K (Positives + Negatives)": "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1",
	"2Sum Problem": "https://leetcode.com/problems/two-sum/",
	"Sort an array of 0's 1's and 2's": "https://leetcode.com/problems/sort-colors/",
	"Majority Element (>n/2 times)": "https://leetcode.com/problems/majority-element/",
	"Kadane's Algorithm, maximum subarray sum": "https://leetcode.com/problems/maximum-subarray/",
	"Stock Buy and Sell": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
	"Rearrange the array in alternating positive and negative items": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
	"Next Permutation": "https://leetcode.com/problems/next-permutation/",
	"Leaders in an Array problem": "https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1",
	"Longest Consecutive Sequence in an Array": "https://leetcode.com/problems/longest-consecutive-sequence/",
	"Set Matrix Zeros": "https://leetcode.com/problems/set-matrix-zeroes/",
	"Rotate Matrix by 90 degrees": "https://leetcode.com/problems/rotate-image/",
	"Print the matrix in spiral manner": "https://leetcode.com/problems/spiral-matrix/",
	"Count subarrays with given sum": "https://leetcode.com/problems/subarray-sum-equals-k/",
	"Pascal's Triangle": "https://leetcode.com/problems/pascals-triangle/",
	"Majority Element (n/3 times)": "https://leetcode.com/problems/majority-element-ii/",
	"3-Sum Problem": "https://leetcode.com/problems/3sum/",
	"4-Sum Problem": "https://leetcode.com/problems/4sum/",
	"Merge Overlapping Sub-intervals": "https://leetcode.com/problems/merge-intervals/",
	"Merge two sorted arrays without extra space": "https://leetcode.com/problems/merge-sorted-array/",
	"Find the repeating and missing number": "https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1",
	"Count Inversions": "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
	"Reverse Pairs": "https://leetcode.com/problems/reverse-pairs/",
	"Maximum Product Subarray": "https://leetcode.com/problems/maximum-product-subarray/",
	"Binary Search to find X in sorted array": "https://leetcode.com/problems/binary-search/",
	"Implement Lower Bound": "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1",
	"Search Insert Position": "https://leetcode.com/problems/search-insert-position/",
	"Find the first or last occurrence of a given number in a sorted array": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
	"Search in Rotated Sorted Array I": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
	"Search in Rotated Sorted Array II": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
	"Find minimum in Rotated Sorted Array": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
	"Single element in a Sorted Array": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
	"Find peak element": "https://leetcode.com/problems/find-peak-element/",
	"Find square root of a number in log n": "https://leetcode.com/problems/sqrtx/",
	"Koko Eating Bananas": "https://leetcode.com/problems/koko-eating-bananas/",
	"Minimum days to make M bouquets": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
	"Find the smallest Divisor": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
	"Capacity to Ship Packages within D Days": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
	"Kth Missing Positive Number": "https://leetcode.com/problems/kth-missing-positive-number/",
	"Aggressive Cows": "https://www.geeksforgeeks.org/problems/aggressive-cows/1",
	"Book Allocation Problem": "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1",
	"Split array - Largest Sum": "https://leetcode.com/problems/split-array-largest-sum/",
	"Median of 2 sorted arrays": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
	"Find the row with maximum number of 1's": "https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1",
	"Search in a 2D matrix": "https://leetcode.com/problems/search-a-2d-matrix/",
	"Search in a row and column wise sorted matrix": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
	"Find Peak Element (2D Matrix)": "https://leetcode.com/problems/find-a-peak-element-ii/",
	"Remove outermost Paranthesis": "https://leetcode.com/problems/remove-outermost-parentheses/",
	"Reverse words in a given string / Palindrome Check": "https://leetcode.com/problems/reverse-words-in-a-string/",
	"Largest odd number in a string": "https://leetcode.com/problems/largest-odd-number-in-string/",
	"Longest Common Prefix": "https://leetcode.com/problems/longest-common-prefix/",
	"Isomorphic String": "https://leetcode.com/problems/isomorphic-strings/",
	"check whether one string is a rotation of another": "https://leetcode.com/problems/rotate-string/",
	"Check if two strings are anagram of each other": "https://leetcode.com/problems/valid-anagram/",
	"Sort Characters by frequency": "https://leetcode.com/problems/sort-characters-by-frequency/",
	"Maximum Nesting Depth of Paranthesis": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
	"Roman Number to Integer and vice versa": "https://leetcode.com/problems/roman-to-integer/",
	"Implement Atoi": "https://leetcode.com/problems/string-to-integer-atoi/",
	"Count Number of Substrings": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
	"Longest Palindromic Substring[Do it without DP]": "https://leetcode.com/problems/longest-palindromic-substring/",
	"Sum of Beauty of all substring": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/",
	"Reverse Every Word in A String": "https://leetcode.com/problems/reverse-words-in-a-string/",
	"Count and say": "https://leetcode.com/problems/count-and-say/",
	"Shortest Palindrome": "https://leetcode.com/problems/shortest-palindrome/",
	"Longest happy prefix": "https://leetcode.com/problems/longest-happy-prefix/",
	"Reverse a LinkedList [Iterative]": "https://leetcode.com/problems/reverse-linked-list/",
	"Reverse a LL [Recursive]": "https://leetcode.com/problems/reverse-linked-list/",
	"Find the middle element of the LL": "https://leetcode.com/problems/middle-of-the-linked-list/",
	"Detect a loop in LL": "https://leetcode.com/problems/linked-list-cycle/",
	"Find the starting point in LL": "https://leetcode.com/problems/linked-list-cycle-ii/",
	"Check if LL is palindrome or not": "https://leetcode.com/problems/palindrome-linked-list/",
	"Remove Nth node from the back of the LL": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
	"Delete the middle node of LL": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
	"Sort LL": "https://leetcode.com/problems/sort-list/",
	"Add two numbers in LL": "https://leetcode.com/problems/add-two-numbers/",
	"Merge two sorted linked lists": "https://leetcode.com/problems/merge-two-sorted-lists/",
	"Flattening of LL": "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1",
	"Find intersection point of Y LL": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
	"Rotate a LL": "https://leetcode.com/problems/rotate-list/",
	"Clone a Linked List with random and next pointer": "https://leetcode.com/problems/copy-list-with-random-pointer/",
	"Reverse LL in group of given size K": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
	"Merge K sorted Linked lists": "https://leetcode.com/problems/merge-k-sorted-lists/",
	"Subset Sum : Sum of all Subsets": "https://www.geeksforgeeks.org/problems/subset-sums2234/1",
	"Subset - II ( Print unique subsets )": "https://leetcode.com/problems/subsets-ii/",
	"Combination Sum - 1": "https://leetcode.com/problems/combination-sum/",
	"Combination Sum - 2": "https://leetcode.com/problems/combination-sum-ii/",
	"Combination Sum - 3": "https://leetcode.com/problems/combination-sum-iii/",
	"Palindrome Partitioning": "https://leetcode.com/problems/palindrome-partitioning/",
	"Letter Combinations of a Phone Number": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
	"N Queen": "https://leetcode.com/problems/n-queens/",
	"Sudoko Solver": "https://leetcode.com/problems/sudoku-solver/",
	"Word Search": "https://leetcode.com/problems/word-search/",
	"M Coloring Problem": "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1",
	"Rat in a Maze": "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
	"Generate all binary strings": "https://leetcode.com/problems/letter-case-permutation/",
	"Generate Paranthesis": "https://leetcode.com/problems/generate-parentheses/",
	"Implement Stack using Arrays": "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1",
	"Implement Queue using Arrays": "https://www.geeksforgeeks.org/problems/implement-queue-using-array/1",
	"Implement Stack using Queue": "https://leetcode.com/problems/implement-stack-using-queues/",
	"Implement Queue using Stack": "https://leetcode.com/problems/implement-queue-using-stacks/",
	"Check for balanced paranthesis": "https://leetcode.com/problems/valid-parentheses/",
	"Implement Min Stack": "https://leetcode.com/problems/min-stack/",
	"Next Greater Element": "https://leetcode.com/problems/next-greater-element-i/",
	"Next Greater Element 2": "https://leetcode.com/problems/next-greater-element-ii/",
	"Trapping Rainwater": "https://leetcode.com/problems/trapping-rain-water/",
	"Sum of subarray minimum": "https://leetcode.com/problems/sum-of-subarray-minimums/",
	"Asteroid Collision": "https://leetcode.com/problems/asteroid-collision/",
	"Sum of subarray ranges": "https://leetcode.com/problems/sum-of-subarray-ranges/",
	"Remove k Digits": "https://leetcode.com/problems/remove-k-digits/",
	"Largest rectangle in a histogram": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
	"Maximal Rectangles": "https://leetcode.com/problems/maximal-rectangle/",
	"Sliding Window maximum": "https://leetcode.com/problems/sliding-window-maximum/",
	"LRU cache (IMPORTANT)": "https://leetcode.com/problems/lru-cache/",
	"LFU cache": "https://leetcode.com/problems/lfu-cache/",
	"The Celebrity Problem": "https://www.geeksforgeeks.org/problems/the-celebrity-problem/1",
	"Online Stock Span": "https://leetcode.com/problems/online-stock-span/",
	"Longest Substring Without Repeating Characters": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
	"Max Consecutive Ones III": "https://leetcode.com/problems/max-consecutive-ones-iii/",
	"Fruit Into Baskets": "https://leetcode.com/problems/fruit-into-baskets/",
	"Longest repeating character replacement": "https://leetcode.com/problems/longest-repeating-character-replacement/",
	"Binary subarray with sum": "https://leetcode.com/problems/binary-subarrays-with-sum/",
	"Count number of nice subarrays": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
	"Number of substring containing all three characters": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
	"Maximum point you can obtain from cards": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
	"Subarray with k different integers": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
	"Minimum Window Substring": "https://leetcode.com/problems/minimum-window-substring/",
	"Kth largest element in an array": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
	"Merge M sorted Lists": "https://leetcode.com/problems/merge-k-sorted-lists/",
	"Task Scheduler": "https://leetcode.com/problems/task-scheduler/",
	"Hands of Straights": "https://leetcode.com/problems/hand-of-straights/",
	"Design twitter": "https://leetcode.com/problems/design-twitter/",
	"Kth largest element in a stream of running integers": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
	"Find Median from Data Stream": "https://leetcode.com/problems/find-median-from-data-stream/",
	"K most frequent elements": "https://leetcode.com/problems/top-k-frequent-elements/",
	"Assign Cookies": "https://leetcode.com/problems/assign-cookies/",
	"Lemonade Change": "https://leetcode.com/problems/lemonade-change/",
	"Valid Paranthesis Checker": "https://leetcode.com/problems/valid-parenthesis-string/",
	"Jump Game": "https://leetcode.com/problems/jump-game/",
	"Jump Game 2": "https://leetcode.com/problems/jump-game-ii/",
	"Candy": "https://leetcode.com/problems/candy/",
	"Insert Interval": "https://leetcode.com/problems/insert-interval/",
	"Merge Intervals": "https://leetcode.com/problems/merge-intervals/",
	"Non-overlapping Intervals": "https://leetcode.com/problems/non-overlapping-intervals/",
	"N meetings in one room": "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
	"Fractional Knapsack Problem": "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
	"Minimum number of platforms required for a railway": "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
	"Job sequencing Problem": "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
	"Preorder Traversal of Binary Tree": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
	"Inorder Traversal of Binary Tree": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
	"Post-order Traversal of Binary Tree": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
	"Level order Traversal / Level order traversal in spiral form": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
	"Height of a Binary Tree": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
	"Check if the Binary tree is height-balanced or not": "https://leetcode.com/problems/balanced-binary-tree/",
	"Diameter of Binary Tree": "https://leetcode.com/problems/diameter-of-binary-tree/",
	"Maximum path sum": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
	"Check if two trees are identical or not": "https://leetcode.com/problems/same-tree/",
	"Zig Zag Traversal of Binary Tree": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
	"Right/Left view of Binary Tree": "https://leetcode.com/problems/binary-tree-right-side-view/",
	"Symmetric Binary Tree": "https://leetcode.com/problems/symmetric-tree/",
	"Root to Node Path in Binary Tree": "https://www.geeksforgeeks.org/problems/root-to-leaf-paths/1",
	"LCA in Binary Tree": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
	"Maximum width of a Binary Tree": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
	"Count total Nodes in a COMPLETE Binary Tree": "https://leetcode.com/problems/count-complete-tree-nodes/",
	"Construct Binary Tree from inorder and preorder": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
	"Construct the Binary Tree from Postorder and Inorder Traversal": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
	"Serialize and deserialize Binary Tree": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
	"Flatten Binary Tree to LinkedList": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
	"Search in a Binary Search Tree": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
	"Find Min/Max in BST": "https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1",
	"Ceil in a Binary Search Tree": "https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1",
	"Floor in a Binary Search Tree": "https://www.geeksforgeeks.org/problems/floor-in-bst/1",
	"Insert a given Node in Binary Search Tree": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
	"Delete a Node in Binary Search Tree": "https://leetcode.com/problems/delete-node-in-a-bst/",
	"Find K-th smallest/largest element in BST": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
	"Check if a tree is a BST or BT": "https://leetcode.com/problems/validate-binary-search-tree/",
	"LCA in Binary Search Tree": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
	"Construct a BST from a preorder traversal": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
	"Inorder Successor/Predecessor in BST": "https://www.geeksforgeeks.org/problems/predecessor-and-successor/1",
	"Binary Search Tree Iterator": "https://leetcode.com/problems/binary-search-tree-iterator/",
	"Two Sum In BST | Check if there exists a pair with Sum K": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
	"Recover BST | Correct BST with two nodes swapped": "https://leetcode.com/problems/recover-binary-search-tree/",
	"Largest BST in Binary Tree": "https://www.geeksforgeeks.org/problems/largest-bst/1",
	"BFS of graph": "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
	"DFS of Graph": "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
	"Number of provinces": "https://leetcode.com/problems/number-of-provinces/",
	"Number of Islands": "https://leetcode.com/problems/number-of-islands/",
	"Flood fill": "https://leetcode.com/problems/flood-fill/",
	"Rotten Oranges": "https://leetcode.com/problems/rotting-oranges/",
	"Surrounded Regions": "https://leetcode.com/problems/surrounded-regions/",
	"Word ladder - 1": "https://leetcode.com/problems/word-ladder/",
	"Word ladder - 2": "https://leetcode.com/problems/word-ladder-ii/",
	"Course Schedule - I": "https://leetcode.com/problems/course-schedule/",
	"Course Schedule - II": "https://leetcode.com/problems/course-schedule-ii/",
	"Alien dictionary": "https://www.geeksforgeeks.org/problems/alien-dictionary/1",
	"Cheapest flights within k stops": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
	"Network Delay time": "https://leetcode.com/problems/network-delay-time/",
	"Number of ways to arrive at destination": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
	"Path with minimum effort": "https://leetcode.com/problems/path-with-minimum-effort/",
	"Shortest path in a binary maze": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
	"Number of Distinct Islands": "https://www.geeksforgeeks.org/problems/number-of-distinct-islands/1",
	"Bipartite Graph": "https://leetcode.com/problems/is-graph-bipartite/",
	"Critical Connections in a Network": "https://leetcode.com/problems/critical-connections-in-a-network/",
	"Number of operations to make network connected": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
	"Accounts merge": "https://leetcode.com/problems/accounts-merge/",
	"Making a Large Island": "https://leetcode.com/problems/making-a-large-island/",
	"Most stones removed with same rows or columns": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
	"Swim in rising water": "https://leetcode.com/problems/swim-in-rising-water/",
	"Climbing Stars": "https://leetcode.com/problems/climbing-stairs/",
	"House Robber": "https://leetcode.com/problems/house-robber/",
	"House Robber 2": "https://leetcode.com/problems/house-robber-ii/",
	"Triangle": "https://leetcode.com/problems/triangle/",
	"Minimum path sum in Grid": "https://leetcode.com/problems/minimum-path-sum/",
	"Grid Unique Paths": "https://leetcode.com/problems/unique-paths/",
	"Grid Unique Paths 2": "https://leetcode.com/problems/unique-paths-ii/",
	"Coin Change": "https://leetcode.com/problems/coin-change/",
	"Partition Equal Subset Sum": "https://leetcode.com/problems/partition-equal-subset-sum/",
	"Target Sum": "https://leetcode.com/problems/target-sum/",
	"Coin Change 2": "https://leetcode.com/problems/coin-change-ii/",
	"Longest Common Subsequence": "https://leetcode.com/problems/longest-common-subsequence/",
	"Longest Palindromic Subsequence": "https://leetcode.com/problems/longest-palindromic-subsequence/",
	"Edit Distance": "https://leetcode.com/problems/edit-distance/",
	"Wildcard Matching": "https://leetcode.com/problems/wildcard-matching/",
	"Distinct Subsequences": "https://leetcode.com/problems/distinct-subsequences/",
	"Best time to buy and sell stock": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
	"Buy and sell stock - II": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
	"Buy and sell stocks III": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
	"Buy and stock sell IV": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
	"Buy and sell stocks with cooldown": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
	"Buy and sell stocks with transaction fee": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
	"Longest Increasing Subsequence": "https://leetcode.com/problems/longest-increasing-subsequence/",
	"Number of longest increasing subsequences": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
	"Longest String Chain": "https://leetcode.com/problems/longest-string-chain/",
	"Matrix Chain Multiplication": "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
	"Burst Balloons": "https://leetcode.com/problems/burst-balloons/",
	"Palindrome Partitioning - II": "https://leetcode.com/problems/palindrome-partitioning-ii/",
	"Maximal Rectangle": "https://leetcode.com/problems/maximal-rectangle/",
	"Count Square Submatrices with All Ones": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
	"Implement TRIE | INSERT | SEARCH | STARTSWITH": "https://leetcode.com/problems/implement-trie-prefix-tree/",
	"Maximum XOR of two numbers in an array": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
	"Maximum XOR With an Element From Array": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
	"Number of 1 Bits": "https://leetcode.com/problems/number-of-1-bits/",
	"Single Number II": "https://leetcode.com/problems/single-number-ii/",
	"Single Number III": "https://leetcode.com/problems/single-number-iii/",
	"Power Set": "https://leetcode.com/problems/subsets/",
	"Divide two integers without using multiplication, division and mod operator": "https://leetcode.com/problems/divide-two-integers/",
	"Count Primes": "https://leetcode.com/problems/count-primes/",
	"Pow(x, n)": "https://leetcode.com/problems/powx-n/",
	"Reverse Integer": "https://leetcode.com/problems/reverse-integer/",
	"Excel Sheet Column Title": "https://leetcode.com/problems/excel-sheet-column-title/"
};
//#endregion
//#region src/lib/a2z-data.ts
/** Striver's A2Z DSA Sheet — 18 sections, 474 problems. */
var SECTIONS = [
	{
		section: "Basics",
		title: "Learn the basics",
		subtopics: [
			"Things to know in C++/Java/Python",
			"Build-up logical thinking",
			"Learn STL/Java Collections",
			"Know basic maths",
			"Learn basic recursion",
			"Learn basic hashing"
		],
		problems: [
			{
				n: "User Input / Output",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Data Types",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "If Else statements",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "What are arrays, strings?",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "For loops",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "While loops",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Functions (Pass by Reference and Value)",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Time Complexity [Learn Basics]",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Rectangular Star Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Right-Angled Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Right-Angled Number Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Inverted Right Pyramid",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Floyd's Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Inverted Numeric Right Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Star Pyramid",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Inverted Star Pyramid",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Diamond Star Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Half Diamond Star Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Binary Number Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Number Crown",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Increasing Letter Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Reverse Letter Triangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Alpha-Ramp Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Alpha-Hill Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Symmetric Void Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Star Butterfly Pattern",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Hollow Rectangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Patterns: Concentric Rectangle",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "C++ STL / Java Collections",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Count Digits",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Reverse a Number",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Palindrome Number",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "GCD or HCF",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Armstrong Number",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Print all Divisors",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Check for Prime",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Recursion: Print name N times",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Recursion: Print 1 to N",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Recursion: Print N to 1",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Recursion: Sum of first N numbers",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Recursion: Factorial of N numbers",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Reverse an array",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Check if a string is palindrome",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Fibonacci Number using recursion",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Hashing Theory",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Counting frequencies of array elements",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Find the highest/lowest frequency element",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Selection Sort",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Bubble Sort",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Insertion Sort",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Merge Sort",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Recursive Bubble Sort",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Recursive Insertion Sort",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Quick Sort",
				d: "Medium",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Sorting Techniques",
		title: "Solve problems on sorting",
		subtopics: ["Sorting-I", "Sorting-II"],
		problems: [
			{
				n: "Largest Element in an Array",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Second Largest Element in an Array without sorting",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Check if the array is sorted",
				d: "Easy",
				p: "GFG"
			},
			{
				n: "Remove duplicates from Sorted array",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Left Rotate an array by one place",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Left rotate an array by D places",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Move Zeros to end",
				d: "Easy",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Arrays",
		title: "Arrays [Easy -> Medium -> Hard]",
		subtopics: [
			"Easy problems",
			"Medium problems",
			"Hard problems"
		],
		problems: [
			{
				n: "Linear Search",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Union of Two Sorted Arrays",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Find missing number in an array",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Maximum Consecutive Ones",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Find the number that appears once, others twice",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Longest subarray with given sum K (positives)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest subarray with sum K (positives + negatives)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Two Sum",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Sort an array of 0's 1's and 2's",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Majority Element (>n/2 times)",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Kadane's Algorithm - Maximum Subarray Sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Print subarray with maximum subarray sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Best Time to Buy and Sell Stock",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Rearrange the array in alternating positive and negative items",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Next Permutation",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Leaders in an Array problem",
				d: "Medium",
				p: "GFG"
			},
			{
				n: "Longest Consecutive Sequence in an Array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Set Matrix Zeros",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Rotate Matrix by 90 degrees",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Print the matrix in spiral manner",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count subarrays with given sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Pascal's Triangle",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Majority Element (n/3 times)",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "3-Sum Problem",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "4-Sum Problem",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Largest Subarray with 0 Sum",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Count number of subarrays with given xor K",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Merge Overlapping Sub-intervals",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Merge two sorted arrays without extra space",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Find the repeating and missing number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count Inversions",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Reverse Pairs",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximum Product Subarray",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find the Union and Intersection of two sorted arrays",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Rotate array by K elements",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Check if array is sorted and rotated",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Search in a 2D matrix",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Spiral traversal of matrix",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Subarray sum equals K",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest subarray with equal 0s and 1s",
				d: "Medium",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Binary Search",
		title: "Binary Search [1D, 2D Arrays, Search Space]",
		subtopics: [
			"BS on 1D Arrays",
			"BS on Answers",
			"BS on 2D Arrays"
		],
		problems: [
			{
				n: "Binary Search to find X in sorted array",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement Lower Bound",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement Upper Bound",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Search Insert Position",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Floor/Ceil in Sorted Array",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Find the first or last occurrence of a given number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count occurrences of a number in a sorted array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Search in Rotated Sorted Array I",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Search in Rotated Sorted Array II",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find minimum in Rotated Sorted Array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find out how many times the array has been rotated",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Single element in a Sorted Array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find peak element",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find square root of a number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find the Nth root of a number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Koko Eating Bananas",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum days to make M bouquets",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find the smallest Divisor",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Capacity to Ship Packages within D Days",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Kth Missing Positive Number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Aggressive Cows",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Book Allocation Problem",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Split array - Largest Sum",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Painter's Partition",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Minimize Max Distance to Gas Station",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Median of 2 sorted arrays",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Kth element of 2 sorted arrays",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Find the row with maximum number of 1's",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Search in a 2D matrix - II",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find Peak Element (2D Matrix)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Matrix Median",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Find the missing and repeating using binary search",
				d: "Medium",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Strings Basic",
		title: "Strings [Basic and Medium]",
		subtopics: ["Basic string problems", "Medium string problems"],
		problems: [
			{
				n: "Remove outermost Parenthesis",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Reverse words in a given string",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Largest odd number in a string",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Longest Common Prefix",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Isomorphic String",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check whether one string is rotation of another",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check if two strings are anagram",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Sort Characters by frequency",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Maximum Nesting Depth of Parenthesis",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Roman Number to Integer and vice versa",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Implement Atoi",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count Number of Substrings",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Palindromic Substring",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sum of Beauty of all substrings",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Reverse every word in a string",
				d: "Medium",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Linked List",
		title: "Linked List [Learning, Medium, Hard]",
		subtopics: [
			"Learn 1D LinkedList",
			"Learn Doubly LinkedList",
			"Medium problems",
			"Hard problems"
		],
		problems: [
			{
				n: "Introduction to LinkedList - construction and traversal",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Insert a node in LinkedList",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Delete a node in LinkedList",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Find the length of the linked list",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Search an element in the LL",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Introduction to DLL - learn about struct and iterations",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Insert a node in DLL",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Delete a node in DLL",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Reverse a DLL",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Middle of a LinkedList",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Reverse a LinkedList (Iterative)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Reverse a LL (Recursive)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Detect a loop in LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find the starting point in LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Length of Loop in LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Check if LL is palindrome or not",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Segregate odd and even nodes in LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Remove Nth node from the back of the LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Delete the middle node of LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sort LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sort a LL of 0's 1's and 2's",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find intersection point of Y LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Add 1 to a number represented by LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Add 2 numbers in LL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Delete all occurrences of a key in DLL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find pairs with given sum in DLL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Remove duplicates from sorted DLL",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Reverse LL in group of given size K",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Rotate a LL",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Flattening of LL",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Clone a LL with random and next pointer",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Recursion",
		title: "Recursion [PatternWise]",
		subtopics: [
			"Get a strong hold",
			"Subsequences pattern",
			"Trying out all combos / Hard"
		],
		problems: [
			{
				n: "Recursive Implementation of atoi()",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Pow(x, n)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count Good numbers",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sort a stack using recursion",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Reverse a stack using recursion",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Generate all binary strings",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Generate Parenthesis",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Print all subsequences/Power Set",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Learn All Patterns of Subsequences",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count all subsequences with sum K",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Check if there exists a subsequence with sum K",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Combination Sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Combination Sum II",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Subset Sum I",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Subset Sum II",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Combination Sum III",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Letter Combinations of a Phone number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Palindrome Partitioning",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Word Search",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "N Queen",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Rat in a Maze",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Word Break",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "M Coloring Problem",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Sudoku Solver",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Expression Add Operators",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Bit Manipulation",
		title: "Bit Manipulation [Concepts & Problems]",
		subtopics: [
			"Learn bit manipulation",
			"Interview problems",
			"Advanced maths"
		],
		problems: [
			{
				n: "Introduction to Bit Manipulation",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check if the i-th bit is set or not",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check if a number is odd or not",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check if a number is power of 2 or not",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Count the number of set bits",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Set/Unset the rightmost unset bit",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Swap two numbers",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Divide two integers without using multiplication, division and mod operator",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Count number of bits to be flipped to convert A to B",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find the number that appears odd number of times",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Power Set using bits",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find xor of numbers from L to R",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find the two numbers appearing odd number of times",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Print Prime Factors of a Number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "All Divisors of a Number",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sieve of Eratosthenes",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find Prime Factorisation of a Number using Sieve",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Power(n, x)",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Stack and Queues",
		title: "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack]",
		subtopics: [
			"Learning",
			"Prefix, Infix, Postfix conversion",
			"Monotonic Stack/Queue problems",
			"Implementation problems"
		],
		problems: [
			{
				n: "Implement Stack using Arrays",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement Queue using Arrays",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement Stack using Queue",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement Queue using Stack",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement stack using Linkedlist",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Implement queue using Linkedlist",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check for balanced parenthesis",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Implement Min Stack",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Infix to Postfix Conversion using Stack",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Prefix to Infix Conversion",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Prefix to Postfix Conversion",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Postfix to Prefix Conversion",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Postfix to Infix",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Convert Infix To Prefix Notation",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Next Greater Element",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Next Greater Element 2",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Next Smaller Element",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of NGEs to the right",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Trapping Rainwater",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sum of subarray minimum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Asteroid Collision",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Sum of subarray ranges",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Remove k Digits",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Largest rectangle in a histogram",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximal Rectangles",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Sliding Window maximum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Stock span problem",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "The Celebrity Problem",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "LRU cache (IMPORTANT)",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "LFU cache",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Sliding Window",
		title: "Sliding Window & Two Pointer Combined Problems",
		subtopics: ["Medium problems", "Hard problems"],
		problems: [
			{
				n: "Longest Substring Without Repeating Characters",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Max Consecutive Ones III",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Fruit Into Baskets",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest repeating character replacement",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Binary subarray with sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count number of nice subarrays",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of substrings containing all three characters",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Maximum point you can obtain from cards",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Substring with At Most K Distinct Characters",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Subarray with k different integers",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Minimum Window Substring",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Minimum Window Subsequence",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Heaps",
		title: "Heaps [Learning, Medium, Hard Problems]",
		subtopics: [
			"Learning",
			"Medium problems",
			"Hard problems"
		],
		problems: [
			{
				n: "Introduction to Priority Queues using Binary Heaps",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Min Heap and Max Heap Implementation",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Check if an array represents a min-heap or not",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Convert min Heap to max Heap",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Kth largest element in an array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Kth smallest element in an array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Sort K sorted array",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Merge M sorted Lists",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Replace each array element by its corresponding rank",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Task Scheduler",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Hands of Straights",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Design twitter",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Connect n ropes with minimal cost",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Kth largest element in a stream of running integers",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximum Sum Combination",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Find Median from Data Stream",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "K most frequent elements",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Greedy Algorithms",
		title: "Greedy Algorithms [Easy, Medium/Hard]",
		subtopics: ["Easy problems", "Medium/Hard problems"],
		problems: [
			{
				n: "Assign Cookies",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Fractional Knapsack Problem",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Greedy algorithm to find minimum number of coins",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Lemonade Change",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Valid Parenthesis Checker",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "N meetings in one room",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Jump Game",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Jump Game 2",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum number of platforms required for a railway",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Job sequencing Problem",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Candy",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Program for Shortest Job First (SJF) CPU Scheduling",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Insert Interval",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Merge Intervals",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Non-overlapping Intervals",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Binary Trees",
		title: "Binary Trees [Traversals, Medium and Hard Problems]",
		subtopics: [
			"Traversals",
			"Medium problems",
			"Hard problems"
		],
		problems: [
			{
				n: "Introduction to Trees",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Binary Tree Representation in C++/Java",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Binary Tree Traversals in Binary Tree",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Preorder Traversal of Binary Tree",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Inorder Traversal of Binary Tree",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Post-order Traversal of Binary Tree",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Level order Traversal / Level order traversal in spiral form",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Iterative Preorder Traversal of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Iterative Inorder Traversal of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Post-order Traversal using 2 stacks",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Post-order Traversal using 1 stack",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Preorder, Inorder, and Postorder Traversal in one Traversal",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Height of a Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Check if the Binary tree is height-balanced",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Diameter of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Maximum path sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Check if two trees are identical",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Zig Zag Traversal of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Boundary Traversal of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Vertical Order Traversal of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Top View of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Bottom View of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Right/Left View of Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Symmetric Binary Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Root to Node Path in Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "LCA in Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximum width of a Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Check for Children Sum Property",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Print all the Nodes at a distance of K in a Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Minimum time taken to BURN the Binary Tree from a Node",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Count total Nodes in a COMPLETE Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Requirements needed to construct a Unique Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Construct Binary Tree from inorder and preorder",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Construct the Binary Tree from Postorder and Inorder Traversal",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Serialize and deserialize Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Morris Preorder Traversal of a Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Morris Inorder Traversal of a Binary Tree",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Flatten Binary Tree to LinkedList",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Binary Search Trees",
		title: "Binary Search Trees [Concept and Problems]",
		subtopics: ["Concepts", "Practice problems"],
		problems: [
			{
				n: "Introduction to Binary Search Tree",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Search in a Binary Search Tree",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Find Min/Max in BST",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Ceil in a Binary Search Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Floor in a Binary Search Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Insert a given Node in Binary Search Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Delete a Node in Binary Search Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find K-th smallest/largest element in BST",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Check if a tree is a BST or BT",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "LCA in Binary Search Tree",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Construct a BST from a preorder traversal",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Inorder Successor/Predecessor in BST",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Merge 2 BST's",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Two Sum In BST",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Recover BST | Correct BST with two nodes swapped",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Largest BST in Binary Tree",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Graphs",
		title: "Graphs [Concepts & Problems]",
		subtopics: [
			"Learning",
			"BFS/DFS problems",
			"Topological sort",
			"Shortest path algorithms",
			"Minimum spanning tree / Disjoint set",
			"Other algorithms"
		],
		problems: [
			{
				n: "Graph and Types",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Graph Representation in C++/Java",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Connected Components | Logic Explanation",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "BFS",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "DFS",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Number of provinces",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Connected Components Problem in Matrix",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Rotten Oranges",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Flood fill",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Cycle Detection in undirected Graph (bfs)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Cycle Detection in undirected graph (dfs)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "0/1 Matrix (Bfs Problem)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Surrounded Regions (dfs)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of Enclaves [flood fill implementation - multisource]",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Word ladder - 1",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Word ladder - 2",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Number of Distinct Islands [dfs multisource]",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Bipartite Graph (DFS)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Cycle Detection in Directed Graph (DFS)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Topological Sort Algorithm (DFS)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Kahn's Algorithm (BFS Topological Sort)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Cycle Detection in Directed Graph (BFS)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Course Schedule - I",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Course Schedule - II",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Find eventual safe states",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Alien dictionary",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Shortest Path in Directed Acyclic Graph Topological Sort",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Shortest Path in Undirected Graph with unit distance",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Dijkstra's Algorithm using Priority Queue",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Dijkstra's Algorithm using Set",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Shortest path in a binary maze",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Path with minimum effort",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Cheapest flights within k stops",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of ways to arrive at destination",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum steps to reach end from start by performing multiplication and mod operations with array elements",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Bellman Ford Algorithm",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Floyd Warshall Algorithm",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Find the city with the smallest number of neighbors in a threshold distance",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Minimum Spanning Tree - Theory",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Prim's Algorithm",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Disjoint Set [Union by Rank]",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Disjoint Set [Union by Size]",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Kruskal's Algorithm",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of operations to make network connected",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Most stones removed with same rows or columns",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Accounts merge",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Number of island II",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Making a Large Island",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Swim in rising water",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Bridges in Graph",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Articulation Point in Graph",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Kosaraju's Algorithm",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Strongly Connected Components",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Dynamic Programming",
		title: "Dynamic Programming [Patterns and Problems]",
		subtopics: [
			"Introduction to DP",
			"1D DP",
			"2D/3D DP and DP on Grids",
			"DP on Subsequences",
			"DP on Strings",
			"DP on Stocks",
			"DP on LIS",
			"MCM DP / Partition DP",
			"DP on Squares"
		],
		problems: [
			{
				n: "Dynamic Programming Introduction",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Fibonacci Number (Memoization & Tabulation)",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Climbing Stairs",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Frog Jump",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Frog Jump with k distances",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Maximum sum of non-adjacent elements",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "House Robber",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Ninja's Training",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Grid Unique Paths",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Grid Unique Paths 2",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum path sum in Grid",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum path sum in Triangular Grid",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum/Maximum Falling Path Sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "3-D DP: Ninja and his friends",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Subset sum equal to target",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Partition Equal Subset Sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Partition Set Into 2 Subsets With Min Absolute Sum Diff",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Count Subsets with Sum K",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count Partitions with Given Difference",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "0/1 Knapsack",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum Coins",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Target Sum",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Coin Change 2",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Unbounded Knapsack",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Rod Cutting Problem",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Common Subsequence",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Print Longest Common Subsequence",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Common Substring",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Palindromic Subsequence",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum insertions to make string palindrome",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Minimum Insertions/Deletions to Convert String",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Shortest Common Supersequence",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Distinct Subsequences",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Edit Distance",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Wildcard Matching",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Best Time to Buy and Sell Stock (DP)",
				d: "Easy",
				p: "LeetCode"
			},
			{
				n: "Buy and Sell Stock - II",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Buy and Sell Stocks III",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Buy and Sell Stocks IV",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Buy and Sell Stocks With Cooldown",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Buy and Sell Stocks With Transaction Fee",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Increasing Subsequence",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Printing Longest Increasing Subsequence",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Largest Divisible Subset",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest String Chain",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest Bitonic Subsequence",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of Longest Increasing Subsequences",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Matrix Chain Multiplication",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Minimum Cost to Cut the Stick",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Burst Balloons",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Evaluate Boolean Expression to True",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Palindrome Partitioning - II",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Partition Array for Maximum Sum",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximum Rectangle Area with all 1's",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Count Square Submatrices with All Ones",
				d: "Medium",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Tries",
		title: "Tries [Theory & Problems]",
		subtopics: ["Theory", "Problems"],
		problems: [
			{
				n: "Implement TRIE | INSERT | SEARCH | STARTSWITH",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Implement Trie - 2 (Prefix Tree)",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Longest String with All Prefixes",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Number of Distinct Substrings in a String",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Bit PreRequisites for TRIE Problems",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximum XOR of two numbers in an array",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Maximum XOR With an Element From Array",
				d: "Hard",
				p: "LeetCode"
			}
		]
	},
	{
		section: "Strings Advanced",
		title: "Strings [Advanced Algorithms]",
		subtopics: ["Hard string algorithms"],
		problems: [
			{
				n: "Minimum number of bracket reversals needed to make an expression balanced",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Count and say",
				d: "Medium",
				p: "LeetCode"
			},
			{
				n: "Hashing In Strings | Theory",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Rabin Karp",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Z-Function",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "KMP algo / LPS(pi) array",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Shortest Palindrome",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Longest happy prefix",
				d: "Hard",
				p: "LeetCode"
			},
			{
				n: "Count palindromic subsequence in given string",
				d: "Hard",
				p: "LeetCode"
			}
		]
	}
];
/**
* Upgrade 1: attach verified direct problem links in place.
* Problems missing from VERIFIED_LINKS keep `l === undefined`, which makes
* `platformLink()` fall back to the original search URL and marks the problem
* `linkVerified: false` in the UI.
*/
SECTIONS.forEach((section) => {
	section.problems.forEach((p) => {
		const direct = VERIFIED_LINKS[p.n];
		if (direct) {
			p.l = direct;
			p.linkVerified = true;
		} else p.linkVerified = false;
	});
});
SECTIONS.reduce((a, s) => a + s.problems.filter((p) => p.linkVerified).length, 0);
//#endregion
export { VERIFIED_LINKS as n, SECTIONS as t };
