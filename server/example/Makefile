CC = g++
CPPFLAGS = -g -std=c++11

solver: solver.o
	${CC} ${CPPFLAGS} -o solver solver.o

clean:
	rm -rf *.o
	rm -f solver