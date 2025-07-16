//import axios from 'axios'
// biome-ignore lint/performance/noNamespaceImport: Testing
import * as vscode from 'vscode'

let intervalId: NodeJS.Timeout | undefined

export function activate(context: vscode.ExtensionContext) {
  const startCommand = vscode.commands.registerCommand(
    'dynamicVibes.start',
    () => {
      vscode.window.showInformationMessage('🎶 Dynamic Vibes iniciado!')
      startDynamicTheme()
    }
  )

  const stopCommand = vscode.commands.registerCommand(
    'dynamicVibes.stop',
    () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = undefined
        vscode.window.showInformationMessage('🛑 Dynamic Vibes parado.')
      }
    }
  )

  context.subscriptions.push(startCommand, stopCommand)
}

export function deactivate() {
  if (intervalId) {
    clearInterval(intervalId)
  }
}

function startDynamicTheme() {
  intervalId = setInterval(async () => {
    try {
      // Exemplo simples: muda a cor de acordo com o horário
      const hour = new Date().getHours()
      let color: string
      if (hour < 12) {
        color = '#FFDD57'
      } else if (hour < 18) {
        color = '#57FFA1'
      } else {
        color = '#5747FF'
      }

      // Atualiza as cores da UI
      await vscode.workspace.getConfiguration().update(
        'workbench.colorCustomizations',
        {
          'statusBar.background': color,
          'activityBar.background': color,
        },
        vscode.ConfigurationTarget.Global
      )

      // Simula integração com Spotify (aqui você faria a request real)
      const currentTrack = await getFakeSpotifyTrack()

      vscode.window.showInformationMessage(`🎧 Tocando: ${currentTrack}`)
    } catch (err) {
      vscode.window.showErrorMessage(`Dynamic Vibes erro: ${err}`)
    }
  }, 10_000) // a cada 10 segundos
}

// Mock para o Spotify API
function getFakeSpotifyTrack(): Promise<string> {
  return Promise.resolve('Imagine Dragons - Believer')
}
