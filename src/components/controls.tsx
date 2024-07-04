'use client'

const Button = (props: any) => {
  let {className, children, ...rest} = props;

  return (
      <button className={`flex justify-center ${className} cursor-pointer`} {...rest}>
        <div className="flex items-center">
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </button>
  )
}

const VideoTag = (props:any)=>{
  let {className, onClick, children} = props;

  return (
    <div className={`flex justify-center py-1 px-4 bg-red-50 rounded-2xl ${className}`} onClick={onClick}>
      <div className="flex items-center">
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>
  )
}

export {
  Button,
  VideoTag
}