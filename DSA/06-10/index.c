#include <stdio.h>
void insertElementAtPosition(int arr[], int size, int position, int key)
{
    if (position > size)
    {
        printf("array out of bound");
    }
    else
    {
        arr[position - 1] = key;
        printf("value is store at %d \n", position);
        for (int i = 0; i < size; i++)
        {
            printf("%d\n", arr[i]);
        }
    }
}

void insertInLast(int arr[10], int size, int capacity)
{
    if (size > capacity)
    {
        printf("array is full");
    }
    else
    {
        int element = 0;
        printf("enter the element\n");
        for (int i = 0; i < size; i++)
        {
            scanf("%d", element);
        
        arr[size + 1] = element;
        printf("%d\n", arr[i]);
        }1
    }

void main()
{
    int arr[10] = {1, 2, 3, 4, 5};
    int size = 5;
    int capacity = sizeof(arr) / sizeof(arr[0]);
    // printf("%d",capacity);

    // insertElementAtPosition(arr, size, 6, 100);
    insertInLast(arr, size, capacity);
}