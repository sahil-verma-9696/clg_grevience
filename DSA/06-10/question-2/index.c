#include <stdio.h>

void display(int arr[], int size)
{
    printf("[");
    for (int i = 0; i < size; i++)
    {
        printf(" %d ,", arr[i]);
    }
    printf("]");
}

void insertElementAtindex(int arr[], int size, int capacity, int index, int key)
{
    // int temp
    if (index > size - 1)
    {
        printf("array out of bound");
    }
    else
    {
        int newArr[capacity];
        for (int i = 0; i < capacity; i++)
        {
            if (i < index)
            {
                newArr[i] = arr[i];
            }
            else if (i == index)
            {
                newArr[index] = key;
            }
            else
            {
                newArr[i] = arr[i-1];
            }
        }
        display(arr, capacity);
        printf("\n");
        display(newArr, capacity);
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
        }
    }
}

void main()
{
    int arr[10] = {1, 2, 3, 4, 5, 6, 7};
    int size = 7;
    int capacity = sizeof(arr) / sizeof(arr[0]);
    int position;
    printf("emter the position = ");
    scanf("%d",&position);
    insertElementAtindex(arr, size, capacity, position-1, 100);
    // insertInLast(arr, size, capacity);
}