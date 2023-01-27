import os
#os.system("cd backend \n python3 manage.py runserver 8080")
from multiprocessing import Process

def runcommand(args):
    print("Running ",args)
    os.system(args)

if __name__ == '__main__':
    p1 = Process(target=runcommand, args=("cd backend \n python3 manage.py runserver 8000",))
    p2 = Process(target=runcommand, args=("cd frontend \n npm start ",))
    p1.start()
    p2.start()
    p1.join()
    p2.join()

    print("process terminated")