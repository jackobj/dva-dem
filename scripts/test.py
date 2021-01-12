import sys
import os


def test():
    print("当前路径", os.getcwd())
    cmd = "scp -r dist/  ../new/"
    run_cmd = os.system(cmd)
    print(run_cmd)
    print("脚本名：", sys.argv[0])
    for i in range(1, len(sys.argv)):
        print("参数", i, sys.argv[i])


if __name__ == '__main__':
    test()
