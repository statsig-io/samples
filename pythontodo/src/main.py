import todo_controller
import constants
import util


if __name__ == '__main__':
    util.initializeSdk()
    todo_controller.app.run(host=constants.HOST, port=constants.PORT,debug=True)