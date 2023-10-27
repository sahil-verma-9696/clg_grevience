#include <stdio.h>
#include <stdlib.h>

struct array
{
    int total_size;
    int used_size;
    int *ptr;
};

int createArray(struct array *a, int tSize, int uSize)
{
    a->total_size = tSize;
    a->used_size = uSize;
    a->ptr = (int *)malloc(tSize * sizeof(int));
      for (int i = 0; i < a->total_size; i++)
    {
        a->ptr[i] = 0;
    }
}

void display(struct array * a)
{
    printf("[");
    for (int i = 0; i < a->used_size; i++)
    {
        printf(" %d ,", (a->ptr)[i]);
    }
    printf("]");
}

int setVal(struct array *a)
{
    int n;
    for (int i = 0; i < a->used_size; i++)
    {
        printf("enter the %d element\n",i);
        scanf("%d",&n);
        a->ptr[i] = n;
    }
}

int main()
{
    struct array myArray;
    createArray(&myArray, 10, 5);
    setVal(&myArray);
    display(&myArray);
    return 0;
}