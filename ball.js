AFRAME.registerComponent('balls',{
    init:function(){
        this.shootBalls()
    },
    shootBalls:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key==='z'){
                var ball = document.createElement('a-entity')
                ball.setAttribute('geometry',{
                    primitive:'sphere',
                    radius:1,
                })
                ball.setAttribute('material',{
                    src : './assets/images.jpg'
                })
                var cam = document.querySelector('#camera')
                var pos = cam.getAttribute('position')
                var scene = document.querySelector('#scene')

                ball.setAttribute('position',{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })

                var camera = document.querySelector('#camera').object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute('velocity',direction.multiplyScalar(-10))
                ball.addEventListener('collide',this.removeBalls)
                ball.setAttribute('dynamic-body',{
                    shape:'sphere',
                    mass:0
                })
                scene.appendChild(ball)
            }
        })
    },

    removeBalls:function(e){

        //original entity (bullet)
        console.log(e.detail.target.el)

        //other entity on which the bullet touches
        console.log(e.detail.body.el)

        var element = e.detail.target.el
        var elementHit = e.detail.body.el

        if(elementHit.id.includes('pins')){
            elementHit.setAttribute('material',{
                opacity:1,
                transparent:true
            })
                var impulse = new CANNON.Vec3(0,1,-15);
                var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'))
                elementHit.body.applyForce(impulse,worldPoint)
                element.removeEventListener('collide',this.removeBalls)
                var scene = document.querySelector('#scene')
                scene.removeChild(element)
        }
    }
})