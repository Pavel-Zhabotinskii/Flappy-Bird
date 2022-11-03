
function _createModal(score){
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin',`
			<div class="modal-overlay" data-close = 'true' >
				<div class="modal-window">
                    <div class = "modal-score">${score}</div>
                    <div class = "modal-btn">
                        <button class = "modal-reset">Reset</button>
                        <button class = "modal-close" data-close = "true">Close</button>
                    </div>
				</div>
			</div>
    `)
    document.body.appendChild(modal)
    return modal 
}

$.modal = function (options){
    const $modal = _createModal(options)
    const ANIMATION_SPEED = 2000
    let closing = false
    
    const modal ={
        open(){
            !closing && $modal.classList.add('open')
         },
        close(){
            closing = true;
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
    }
    const listener = event => {
        if(event.target.dataset.close)modal.close()
    }

    $modal.addEventListener('click', listener)
    
    return modal
}

