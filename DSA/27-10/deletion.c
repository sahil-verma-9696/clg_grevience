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

void delDesire(int arr[], int length, int position)
{
    if(position > length ){
        printf("position does not exist");
    }
    int newArr[length-1];
    for (int i = 0; i < length; i++)
    {
        newArr[i] = arr[i];
        if(i >= position-1){
            newArr[i] = arr[i+1];
        }
    }
    int size = sizeof(newArr)/sizeof(int);
    display(newArr,size);
}

void main()
{
    int size;
    printf("Enter the size of array below\n");
    scanf("%d",&size);
    int arr[size];
    printf("Enter the element of new array \n");

    for(int i = 0; i<size; i++){
        int n;
        scanf("%d",&n);
        arr[i] = n;
    }

    delDesire(arr,size,3);

}