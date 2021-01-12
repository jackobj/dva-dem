import sys
import os


def test():
    print("当前路径", os.getcwd())
    cmd = "rm -rf dist/"
    run_cmd = os.system(cmd)
    print(run_cmd)


if __name__ == '__main__':
    test()
