// match filename in path
/((?!\/)[^/]+)(?=\.\w+)/

// match filename in path without extension
/((?!\/)[^/]+)(?=\.\w+)/

// url
/^((https?|ftp|file):\/\/)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}[-a-zA-Z0-9@:%_+.~#?&/=]*$/